import React from 'react';
import ReactMaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';

// type Props = {
//   mask: Array<string>,
// };

const MaskedInput = ({ inputProps, ...rest }) => (
  <Input
    inputComponent={ReactMaskedInput}
    inputProps={{
      'data-lpignore': true, // Disable LastPass grey box
      ...inputProps,
    }}
    {...rest}
  />
);

export default MaskedInput;
