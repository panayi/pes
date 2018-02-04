/* @flow */
import React from 'react';
import ReactMaskedInput from 'react-text-mask';
import Input from 'material-ui/Input';

type Props = {
  mask: Array<string>,
};

const MaskedInput = ({ mask, ...rest }: Props) => (
  <Input
    inputComponent={ReactMaskedInput}
    inputProps={{
      mask,
      'data-lpignore': true, // Disable LastPass grey box
    }}
    {...rest}
  />
);

export default MaskedInput;
