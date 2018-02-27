import React from 'react';
import PropTypes from 'prop-types';
import urlForPath from 'utils/urlForPath';

const CanonicalUrl = ({ path }) => (
  <link rel="canonical" href={urlForPath(path)} />
);

CanonicalUrl.propTypes = {
  path: PropTypes.string.isRequired,
};

export default CanonicalUrl;
