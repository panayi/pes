import React from 'react';
import * as R from 'ramda';
import TextField from 'material-ui/TextField';
import * as phoneNumbersConfig from '@pesposa/core/src/config/phoneNumbers';

const options = R.pair(phoneNumbersConfig.BY_COUNTRY);

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
      ([countryCode, countryProps]) => (
        <option key={countryCode} value={countryCode}>
          {getLabel(countryProps)}
        </option>
      ),
      options,
    )}
  </TextField>
);

CountrySelect.defaultProps = {
  getLabel: R.prop('name'),
};

export default CountrySelect;
