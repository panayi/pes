import React from 'react';
import PropTypes from 'prop-types';
import FullHeight from '../../lib/components/FullHeight';
import Header from './Header';

const Layout = ({ children }) => (
  <FullHeight>
    <Header />
    {children}
  </FullHeight>
);

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
