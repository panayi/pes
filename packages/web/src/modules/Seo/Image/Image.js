import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ children }) => (
  <React.Fragment>
    <meta property="og:image" content={children} />
    <meta name="twitter:image" content={children} />
  </React.Fragment>
);

Image.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Image;
