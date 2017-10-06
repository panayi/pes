import React from 'react';
import R from 'ramda';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';

const FIXED_LAYOUT_WIDTH = 1128;
const MARGIN = 3;

const getContainerProps = ({ fixedWidth, center, ...otherProps }) => ({
  flex: 1,
  width: fixedWidth ? FIXED_LAYOUT_WIDTH : null,
  my: MARGIN,
  ml: center ? 'auto' : MARGIN,
  mr: center ? 'auto' : MARGIN,
  ...otherProps,
});

const numberOfChildrenEquals = number => R.compose(
  R.equals(number),
  R.length,
  R.defaultTo([]),
  R.prop('children'),
);


const OneColumn = ({ children, ...otherProps }) => (
  <Flex {...getContainerProps(otherProps)}>
    {children}
  </Flex>
);

const TwoColumn = ({ children, widths = ['300px', null], ...otherProps }) => (
  <Flex {...getContainerProps(otherProps)}>
    <Box
      flex={`0 0 ${widths[0]}`}
      mr={1}
    >
      {children[0]}
    </Box>
    <Box
      flex="1"
      width={widths[1]}
      ml={1}
    >
      {children[1]}
    </Box>
  </Flex>
);

const ThreeColumn = ({ children, widths = ['300px', null, '300px'], ...otherProps }) => (
  <Flex {...getContainerProps(otherProps)}>
    <Box flex={`0 0 ${widths[0]}`}>
      {children[0]}
    </Box>
    <Box
      flex="1"
      width={widths[1]}
    >
      {children[1]}
    </Box>
    <Box flex={`0 0 ${widths[2]}`}>
      {children[2]}
    </Box>
  </Flex>
);

const Page = R.cond([
  [numberOfChildrenEquals(2), TwoColumn],
  [numberOfChildrenEquals(3), ThreeColumn],
  [R.T, OneColumn],
]);

Page.propTypes = {
  children: PropTypes.node,
  widths: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

Page.defaultProps = {
  children: null,
};

export default Page;
