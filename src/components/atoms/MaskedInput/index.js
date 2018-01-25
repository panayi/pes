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
        // eslint-disable-line react/jsx-no-duplicate-props
        mask,
        'data-lpignore': true, // Disable LastPass grey box
      }}
      {...rest}
    />
  );

export default MaskedInput;
