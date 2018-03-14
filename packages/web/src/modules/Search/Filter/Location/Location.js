/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { isNilOrEmpty, noop } from 'ramda-adjunct';
import { withStateHandlers, lifecycle } from 'recompose';
import { createStructuredSelector } from 'reselect';
import scriptLoader from 'react-async-script-loader';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from 'material-ui/TextField';
import { InputAdornment } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
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
import poweredByGoogleImage from './images/poweredByGoogle.png';

const GOOGLE_MAPS_SCRIPT_URL = `https://maps.googleapis.com/maps/api/js?key=${
  env.googleApisKey
}&v=3.exp&libraries=places`;

type Props = {
  setLocation: Function,
  countryCode: ?string,
  address: string, // eslint-disable-line react/no-unused-prop-types
  isScriptLoadSucceed: boolean,
  value: string,
  results: Array<Object>,
  selectAddress: string,
  setValue: Function,
  selectAddress: Function,
  setResults: Function,
  handleFocus: Function,
  handleBlur: Function,
  classes: Object,
};

type State = {
  address: string,
  selectedAddress: string,
};

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  suggestionsContainer: {
    '& .googleLogo': {
      display: 'flex',
      justifyContent: 'center',
      padding: [theme.spacing.unit, theme.spacing.unit * 2],
      borderTop: [1, 'solid', theme.palette.divider],
    },
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
    '& > div': {
      fontSize: theme.typography.body1.fontSize,
    },
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  locationIcon: {
    alignSelf: 'center',
    color: theme.palette.primary.light,
  },
});

function renderInput(inputProps) {
  const { classes, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      inputRef={ref}
      InputProps={{
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.description, query);
  const parts = parse(suggestion.description, matches);

  return (
    <MenuItem selected={isHighlighted} component="div" dense>
      <div>
        {parts.map((part, index) => part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          ))}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
      {children && (
        <div className="googleLogo">
          <img alt="Powered by Google" src={poweredByGoogleImage} />
        </div>
      )}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.description;
}

class SearchLocation extends Component<Props, State> {
  static defaultProps = {
    setLocation: noop,
  };

  componentDidMount() {
    if (this.props.isScriptLoadSucceed) {
      this.loadServices();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isScriptLoadSucceed && this.props.isScriptLoadSucceed) {
      this.loadServices();
    }
  }

  fetchPredictions = value => {
    const { countryCode, setResults } = this.props;

    if (!this.autocompleteService || isNilOrEmpty(value)) {
      setResults([]);
    } else {
      this.autocompleteService.getPlacePredictions(
        {
          input: value,
          componentRestrictions: { country: countryCode },
          types: ['geocode'],
        },
        setResults,
      );
    }
  };

  loadServices() {
    this.autocompleteService = new window.google.maps.places.AutocompleteService();
    this.placesService = new window.google.maps.places.PlacesService(
      document.createElement('div'),
    );
  }

  autocompleteService = null;
  placesService = null;

  handleFocus = event => {
    event.target.select();
  };

  handleBlur = () => {
    this.props.handleBlur();
  };

  handleChange = (event, { newValue }) => {
    this.props.setValue(newValue);
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    this.fetchPredictions(value);
  };

  handleSuggestionsClearRequested = () => {
    this.props.setResults([]);
  };

  handleSuggestionSelected = (event, { suggestion }) => {
    const placeId = R.prop('place_id', suggestion);

    if (!this.placesService || isNilOrEmpty(placeId)) {
      return;
    }

    this.placesService.getDetails({ placeId }, place => {
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
    });
  };

  render() {
    const { value, isScriptLoadSucceed, results, classes } = this.props;

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainer: classes.suggestionsContainer,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={renderInput}
        suggestions={results}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        onSuggestionSelected={this.handleSuggestionSelected}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          classes,
          placeholder: 'Change your location',
          startAdornment: (
            <InputAdornment
              position="start"
              classes={{ root: classes.locationIcon }}
            >
              <LocationIcon />
            </InputAdornment>
          ),
          value,
          disabled: !isScriptLoadSucceed,
          onChange: this.handleChange,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
        }}
      />
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
      results: [],
    }),
    {
      setValue: () => value => ({
        value,
      }),
      selectAddress: () => value => ({
        value,
        selectedAddress: value,
      }),
      setResults: () => results => ({
        results: results || [],
      }),
      handleBlur: ({ selectedAddress }) => () => ({
        value: selectedAddress,
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
