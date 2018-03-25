import React from 'react';
import * as R from 'ramda';
import TextField from 'material-ui/TextField';
import * as countryModel from '@pesposa/core/src/models/country';

const countries = countryModel.getAll();

const CountrySelect = ({ getLabel, name, value, onChange, onBlur }) => (
  <TextField
    select
    SelectProps={{ native: true }}
    name={name}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
  >
    <option value="">Select Country</option>
    {R.map(
      country => (
        <option key={country.code} value={country.code}>
          {getLabel(country)}
        </option>
      ),
      countries,
    )}
  </TextField>
);

CountrySelect.defaultProps = {
  countries: [],
  getLabel: R.prop('name'),
};

export default CountrySelect;
