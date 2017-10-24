/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

type Props = {
  children: React$Node,
};

const FullHeight = ({ children }: Props) => (
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
