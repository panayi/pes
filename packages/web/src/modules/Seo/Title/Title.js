import React from 'react';
import PropTypes from 'prop-types';

const fullTitle = title => `${title} - Pesposa`;

const Title = ({ children }) => (
  <React.Fragment>
    <title>{fullTitle(children)}</title>
    <meta property="og:title" content={fullTitle(children)} />
    <meta name="twitter:title" content={fullTitle(children)} />
  </React.Fragment>
);

Title.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Title;
