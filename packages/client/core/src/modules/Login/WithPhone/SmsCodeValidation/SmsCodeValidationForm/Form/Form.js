import React from 'react';
import * as R from 'ramda';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MaskedInput from '../../../../../../components/MaskedInput/MaskedInput';

const MASK = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

// type Props = {
//   handleSubmit: Function,
//   handleChange: Function,
//   handleBlur: Function,
//   values: Object,
//   errors: Object,
//   children: React$Node,
// };

const Form = props => {
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
      <FormControl error={R.has('code', errors)} fullWidth>
        <MaskedInput
          name="code"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.code}
          fullWidth
          placeholder="Enter SMS code"
          autoComplete="off"
          inputProps={{
            mask: MASK,
            placeholderChar: '#',
          }}
        />
        {errors.code && <FormHelperText>{errors.code}</FormHelperText>}
      </FormControl>
      {children}
    </form>
  );
};

export default Form;
