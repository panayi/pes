import React from 'react';
import PropTypes from 'prop-types';
import TwitterShareButton from 'components/TwitterShareButton/TwitterShareButton';

const TwitterShareAdButton = ({ ad, ...rest }) => <TwitterShareButton title={ad.title} {...rest} />;

TwitterShareAdButton.propTypes = {
  ad: PropTypes.shape(),
};

TwitterShareAdButton.defaultProps = {
  ad: {},
};

export default TwitterShareAdButton;
