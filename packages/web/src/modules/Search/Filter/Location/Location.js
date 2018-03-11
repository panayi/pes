/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { isNilOrEmpty, noop } from 'ramda-adjunct';
import { withStateHandlers, lifecycle } from 'recompose';
import { createStructuredSelector } from 'reselect';
import scriptLoader from 'react-async-script-loader';
import TextField from 'material-ui/TextField';
import { InputAdornment } from 'material-ui/Input';
import { withStyles } from 'material-ui/styles';
import LocationIcon from 'material-ui-icons/LocationOn';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import env from '@pesposa/core/src/config/env';
import {
  selectors as locationSelectors,
  actions as locationActions,
} from 'store/search/location';
import { selectors as profileLocationSelectors } from 'store/firebase/profile/location';
import connectSearch from 'hocs/connectSearch';

const GOOGLE_MAPS_SCRIPT_URL = `https://maps.googleapis.com/maps/api/js?key=${
  env.googleApisKey
}&v=3.exp&libraries=places`;
const PAC_CONTAINER_CLASS = '.pac-container';
const POSITION_TIMEOUT = 200; // ms

type Props = {
  setLocation: Function,
  countryCode: ?string,
  address: string, // eslint-disable-line react/no-unused-prop-types
  isScriptLoadSucceed: boolean,
  value: string,
  selectAddress: string,
  setValue: Function,
  resetValue: Function,
  selectAddress: Function,
  classes: Object,
};

type State = {
  address: string,
  selectedAddress: string,
};

const styles = theme => ({
  '@global': {
    [PAC_CONTAINER_CLASS]: {
      zIndex: 10000,
      position: 'static !important',
    },
  },
  locationIcon: {
    alignSelf: 'center',
    color: theme.palette.primary.light,
  },
});

class SearchLocation extends Component<Props, State> {
  static defaultProps = {
    setLocation: noop,
  };

  componentDidMount() {
    if (this.props.isScriptLoadSucceed) {
      this.loadAutocomplete();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isScriptLoadSucceed && this.props.isScriptLoadSucceed) {
      this.loadAutocomplete();
    }

    if (propsChanged(['countryCode'], this.props, prevProps)) {
      this.setCountryRestriction();
    }
  }

  componentWillUnmount() {
    this.autocomplete.unbindAll();
  }

  setCountryRestriction() {
    const { countryCode } = this.props;

    if (countryCode && this.autocomplete) {
      this.autocomplete.setComponentRestrictions({ country: countryCode });
    }
  }

  loadAutocomplete() {
    const { searchBox } = this.elements;
    this.autocomplete = new window.google.maps.places.Autocomplete(searchBox);
    this.autocomplete.addListener('place_changed', this.handlePlacesChanged);
    this.setCountryRestriction();
    this.moveAutocompleteEl();
  }

  autocomplete = null;
  elements = {};

  // NOTE: Hack to fix autocomplete-dropdown positioning issues
  moveAutocompleteEl = () => {
    const autocompleteEl = document.querySelector(PAC_CONTAINER_CLASS);

    if (R.isNil(autocompleteEl)) {
      setTimeout(() => this.moveAutocompleteEl(), POSITION_TIMEOUT);
    } else if (this.elements.autocompleteWrapper) {
      this.elements.autocompleteWrapper.appendChild(autocompleteEl);
    }
  };

  handleChange = event => {
    this.props.setValue(event.target.value);
  };

  handleFocus = event => {
    event.target.select();
  };

  handleBlur = () => {
    this.props.resetValue();
  };

  handlePlacesChanged = () => {
    const place = this.autocomplete.getPlace();

    if (isNilOrEmpty(place)) {
      return;
    }

    const location = R.path(['geometry', 'location'], place);
    const address = place.formatted_address;
    const geoposition = {
      latitude: location.lat(),
      longitude: location.lng(),
    };
    this.props.setLocation(address, geoposition);

    this.props.selectAddress(address);
  };

  render() {
    const { value, isScriptLoadSucceed, classes } = this.props;

    return (
      <div style={{ position: 'relative' }}>
        <TextField
          inputRef={ref => {
            this.elements.searchBox = ref;
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                classes={{ root: classes.locationIcon }}
              >
                <LocationIcon />
              </InputAdornment>
            ),
          }}
          placeholder="Change your location"
          disabled={!isScriptLoadSucceed}
          value={value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          fullWidth
        />
        <div
          ref={ref => {
            this.elements.autocompleteWrapper = ref;
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  address: locationSelectors.addressSelector,
  countryCode: profileLocationSelectors.countryCodeSelector,
});

const mapDispatchToProps = {
  setLocation: locationActions.setLocation,
};

export default R.compose(
  connectSearch(mapStateToProps, mapDispatchToProps),
  scriptLoader(GOOGLE_MAPS_SCRIPT_URL),
  withStateHandlers(
    ({ address }) => ({
      value: address || '',
      selectedAddress: address,
    }),
    {
      setValue: () => value => ({
        value,
      }),
      resetValue: ({ selectedAddress }) => () => ({
        value: selectedAddress,
      }),
      selectAddress: () => value => ({
        value,
        selectedAddress: value,
      }),
    },
  ),
  lifecycle({
    componentDidUpdate(prevProps) {
      if (propsChanged(['address'], this.props, prevProps)) {
        this.props.selectAddress(this.props.address);
      }
    },
  }),
  withStyles(styles),
)(SearchLocation);
