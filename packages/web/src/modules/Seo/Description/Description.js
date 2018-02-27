import React from 'react';
import PropTypes from 'prop-types';

const Description = ({ children }) => (
  <React.Fragment>
    <meta name="description" content={children} />
    <meta property="og:description" content={children} />
    <meta name="twitter:description" content={children} />
  </React.Fragment>
);

Description.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Description;
