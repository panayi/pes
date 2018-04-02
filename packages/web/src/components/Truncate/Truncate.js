import React from 'react';
import PropTypes from 'prop-types';
import ReactTruncate from 'react-truncate';

const Truncate = ({ lines, children, className }) => (
  <ReactTruncate className={className} lines={lines}>
    {children}
  </ReactTruncate>
);

Truncate.propTypes = {
  lines: PropTypes.number.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

Truncate.defaultProps = {
  children: null,
  tagName: 'div',
  className: null,
};

export default Truncate;
