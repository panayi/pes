import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const FullHeight = ({ children }) => (
  <div className="full-height">
    {children}
  </div>
);

FullHeight.propTypes = {
  children: PropTypes.node,
};

FullHeight.defaultProps = {
  children: null,
};

export default FullHeight;
