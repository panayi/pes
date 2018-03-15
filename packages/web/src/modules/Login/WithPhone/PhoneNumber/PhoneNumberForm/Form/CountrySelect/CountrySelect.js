import React from 'react';
import * as R from 'ramda';
import TextField from 'material-ui/TextField';
import { connectData } from 'lib/connectData';
import { models } from 'store/firebase/data';

const CountrySelect = ({ getLabel, countries, ...rest }) => (
  <TextField select SelectProps={{ native: true }} {...rest}>
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

const mapDataToProps = {
  countries: models.countries.all,
};

export default R.compose(connectData(mapDataToProps, null, {}))(CountrySelect);
