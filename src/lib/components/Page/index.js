import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass';

const Page = ({ children }) => (
  <Flex m={3}>
    {children}
  </Flex>
);

Page.propTypes = {
  children: PropTypes.node,
};

Page.defaultProps = {
  children: null,
};

export default Page;
