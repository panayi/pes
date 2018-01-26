import React from 'react';
import * as R from 'ramda';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import { connectData } from 'lib/connectData';
import { models } from 'store/firebase/data';

const CountrySelect = ({ getLabel, countries, ...rest }) => (
  <TextField select {...rest}>
    {R.map(
      country => (
        <MenuItem key={country.code} value={country.code}>
          {getLabel(country)}
        </MenuItem>
      ),
      countries,
    )}
  </TextField>
);

CountrySelect.defaultProps = {
  getLabel: R.prop('name'),
};

const mapDataToProps = {
  countries: models.countries.all,
};

export default R.compose(connectData(mapDataToProps))(CountrySelect);
