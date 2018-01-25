/* @flow */
import React from 'react';
import * as R from 'ramda';
import { FormControl, FormHelperText } from 'material-ui/Form';
import MaskedInput from 'components/atoms/MaskedInput';

const MASK = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

type Props = {
  handleSubmit: Function,
  handleChange: Function,
  handleBlur: Function,
  values: Object,
  errors: Object,
  children: React$Node,
};

const Form = (props: Props) => {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    children,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <FormControl error={R.has('name', errors)} fullWidth>
        <MaskedInput
          name="code"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.code}
          mask={MASK}
          placeholderChar="#"
          fullWidth
          placeholder="Enter SMS code"
        />
        {errors.code && <FormHelperText>{errors.code}</FormHelperText>}
      </FormControl>
      {children}
    </form>
  );
};

export default Form;
