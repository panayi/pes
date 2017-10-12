import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Input as MaterialInput, InputLabel } from 'material-ui';
import Check from 'react-icons/lib/fa/check';

const Input = ({ id, label, value, onChange, ...otherProps }) => (
  <InputLabel htmlFor={id}>
    <MaterialInput
      id={id}
      name={id}
      p={0}
      value={value}
      onChange={e => onChange(e.target.value)}
      {...otherProps}
    />
    <Typography
      f={[3, 4]}
      bold
      color="grey"
      mb={2}
      is="span"
    >
      {label}
      <Check />
    </Typography>
  </InputLabel>
);

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  label: '',
  value: '',
  onChange: null,
};

export default Input;
