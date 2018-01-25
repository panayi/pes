/* @flow */
import React from 'react';
import * as R from 'ramda';
import { lifecycle } from 'recompose';
import { FormGroup, FormControl, FormHelperText } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import { PHONE_MASK_BY_COUNTRY_CODE } from 'constants/phoneNumbers';
import propsChanged from 'utils/propsChanged';
import CountrySelect from 'components/atoms/CountrySelect';
import MaskedInput from 'components/atoms/MaskedInput';

type Props = {
  handleSubmit: Function,
  handleChange: Function,
  handleBlur: Function,
  values: Object,
  errors: Object,
  children: React$Node,
  classes: Object,
};

const styles = theme => ({
  input: {
    flex: 1,
    marginLeft: theme.spacing.unit,
  },
});

const Form = (props: Props) => {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    children,
    classes,
  } = props;
  const mask = R.propOr([], values.countryCode, PHONE_MASK_BY_COUNTRY_CODE);

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup row error={R.has('countryCode', errors)}>
        <FormControl>
          <CountrySelect
            name="countryCode"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.countryCode}
            getLabel={country => `${country.name} (${country.callingCode})`}
          />
          {errors.countryCode && (
            <FormHelperText>{errors.countryCode}</FormHelperText>
          )}
        </FormControl>
        <FormControl className={classes.input} error={R.has('number', errors)}>
          <MaskedInput
            name="number"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.number}
            mask={mask}
            placeholder="Your phone number"
          />
          {errors.number && <FormHelperText>{errors.number}</FormHelperText>}
        </FormControl>
      </FormGroup>
      {children}
    </form>
  );
};

export default R.compose(
  lifecycle({
    componentDidUpdate(prevProps) {
      const { onChange } = this.props;

      if (!onChange) {
        return;
      }

      const valuesChanged = propsChanged(['values'], this.props, prevProps);

      if (valuesChanged) {
        onChange(this.props.values);
      }
    },
  }),
  withStyles(styles),
)(Form);
