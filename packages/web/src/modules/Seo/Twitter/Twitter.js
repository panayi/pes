import React from 'react';
import PropTypes from 'prop-types';

const Twitter = ({ handle }) => (
  <React.Fragment>
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content={handle} />
    <meta name="twitter:site" content={handle} />
  </React.Fragment>
);

Twitter.propTypes = {
  handle: PropTypes.string.isRequired,
};

export default Twitter;
