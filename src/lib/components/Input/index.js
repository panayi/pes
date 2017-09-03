import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Text, Input as RebassInput } from 'rebass';
import Check from 'react-icons/lib/fa/check';

// TODO: Figure out how to change tag of Flex to "label",
// so that we can use that, instead of the manual styles here.
const Label = styled.label`
  display: flex;
  flex-direction: column-reverse;
`;

const InputField = styled(RebassInput)`
  border-bottom: 2px solid #ddd;

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }

  &, &:focus {
    box-shadow: none;
    border-radius: 0;
  }

  &:focus {
    border-bottom-color: green;
    outline: 0;
  }

  &:focus + span, &[required]:valid + span {
    color: black;
  }

  + span > svg {
    float: right;
    visibility: hidden;
    color: black;
  }

  &[required]:valid + span > svg {
    visibility: visible;
  }

  ::placeholder { /* Chrome/Opera/Safari */
    color: grey;
    opacity: 0.4;
    font-weight: 300;
  }
`;

const Input = ({ id, label, value, onChange, ...otherProps }) => (
  <Box my={3}>
    <Label htmlFor={id}>
      <InputField
        id={id}
        name={id}
        p={0}
        value={value}
        onChange={e => onChange(e.target.value)}
        {...otherProps}
      />
      <Text
        f={[3, 4]}
        bold
        color="grey"
        mb={2}
        is="span"
      >
        {label}
        <Check />
      </Text>
    </Label>
  </Box>
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
