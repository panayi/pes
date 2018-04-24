import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import TextField from 'material-ui/TextField';
import { selectors as siteSelectors } from 'store/site';

const CountrySelect = ({
  getLabel,
  name,
  value,
  phoneNumberConfig,
  onChange,
  onBlur,
}) => (
  <TextField
    select
    SelectProps={{ native: true, disabled: true }}
    name={name}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
  >
    <option
      key={phoneNumberConfig.countryCode}
      value={phoneNumberConfig.countryCode}
    >
      {getLabel(phoneNumberConfig)}
    </option>
  </TextField>
);

CountrySelect.defaultProps = {
  getLabel: R.prop('name'),
};

const mapStateToProps = createStructuredSelector({
  phoneNumberConfig: siteSelectors.phoneNumberConfigSelector,
});

export default connect(mapStateToProps)(CountrySelect);
