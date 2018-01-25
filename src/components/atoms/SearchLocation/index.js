/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withStateHandlers, lifecycle } from 'recompose';
import { isNilOrEmpty } from 'ramda-adjunct';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import ScriptLoader from 'react-script-loader-hoc';
import noop from 'utils/noop';
import propsChanged from 'utils/propsChanged';
import { selectors as locationSelectors } from 'store/currentLocation';

const GOOGLE_APIS_KEY = process.env.REACT_APP_GOOGLE_APIS_KEY;
const GOOGLE_MAPS_SCRIPT_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_APIS_KEY}&v=3.exp&libraries=places`;
const PAC_CONTAINER_CLASS = '.pac-container';

type Props = {
  onChange: Function,
  countryCode: ?string,
  address: string, // eslint-disable-line react/no-unused-prop-types
  scriptsLoadedSuccessfully: boolean,
  value: string,
  selectAddress: string,
  setValue: Function,
  resetValue: Function,
  selectAddress: Function,
};

type State = {
  address: string,
  selectedAddress: string,
};

const styles = {
  '@global': {
    [PAC_CONTAINER_CLASS]: {
      zIndex: 10000,
      position: ['static', '!important'],
    },
  },
};

class SearchLocation extends Component<Props, State> {
  static defaultProps = {
    onChange: noop,
  };

  componentDidMount() {
    if (this.props.scriptsLoadedSuccessfully) {
      this.loadAutocomplete();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      !prevProps.scriptsLoadedSuccessfully &&
      this.props.scriptsLoadedSuccessfully
    ) {
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
      setTimeout(() => this.moveAutocompleteEl(), 200);
    } else {
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
    this.props.onChange(address, geoposition);

    this.props.selectAddress(address);
  };

  render() {
    const { value, scriptsLoadedSuccessfully } = this.props;

    return (
      <div style={{ position: 'relative' }}>
        <TextField
          inputRef={ref => {
            this.elements.searchBox = ref;
          }}
          placeholder="Change your location"
          disabled={!scriptsLoadedSuccessfully}
          value={value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
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
  countryCode: locationSelectors.countryCodeSelector,
});

export default R.compose(
  connect(mapStateToProps),
  ScriptLoader(GOOGLE_MAPS_SCRIPT_URL),
  withStateHandlers(
    ({ address }) => ({
      value: address,
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
