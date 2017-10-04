import React from 'react';
import R from 'ramda';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';

const CONTAINER_PROPS = {
  m: 3,
  flex: 1,
};

const numberOfChildrenEquals = number => R.compose(
  R.equals(number),
  R.length,
  R.defaultTo([]),
  R.prop('children'),
);


const OneColumn = ({ children }) => (
  <Flex {...CONTAINER_PROPS}>
    {children}
  </Flex>
);

const TwoColumn = ({ children, widths = ['300px', null] }) => (
  <Flex {...CONTAINER_PROPS}>
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

const ThreeColumn = ({ children, widths = ['300px', null, '300px'] }) => (
  <Flex {...CONTAINER_PROPS}>
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
