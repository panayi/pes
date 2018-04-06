import React from 'react';
import * as R from 'ramda';
import { createSelector, createStructuredSelector } from 'reselect';
import { withProps } from 'recompose';
import Select from 'react-select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import propSelector from '@pesposa/core/src/utils/propSelector';
import computedProp from '@pesposa/core/src/utils/computedProp';
import { connectData } from '@pesposa/client-core/src/lib/connectData';
import { models } from '@pesposa/client-core/src/store/firebase/data';

const LocationSelect = ({
  onChange,
  error,
  className,
  options,
  selectedLocation,
}) => (
  <FormControl className={className} margin="normal">
    <Select
      name="location"
      placeholder="Select a location"
      value={selectedLocation}
      onChange={({ value }) => onChange(value)}
      options={options}
    />
    {error && <FormHelperText error>{error}</FormHelperText>}
  </FormControl>
);

const mapDataToProps = {
  locations: models.locations.all,
};

const optionsSelector = createSelector(
  propSelector('locations'),
  R.compose(
    R.map(
      R.compose(
        R.pick(['value', 'label']),
        computedProp('value', R.prop('id')),
        computedProp('label', R.path(['address', 'city'])),
      ),
    ),
    R.defaultTo([]),
  ),
);

const selectedLocationSelector = createSelector(
  propSelector(['value']),
  optionsSelector,
  (locationId, options) => R.find(R.propEq('value', locationId), options),
);

export default R.compose(
  connectData(mapDataToProps),
  withProps(
    createStructuredSelector({
      options: optionsSelector,
      selectedLocation: selectedLocationSelector,
    }),
  ),
)(LocationSelect);
