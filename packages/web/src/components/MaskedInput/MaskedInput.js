/* @flow */
import React from 'react';
import ReactMaskedInput from 'react-text-mask';
import Input from 'material-ui/Input';

type Props = {
  mask: Array<string>,
};

const MaskedInput = ({ inputProps, ...rest }: Props) => (
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
