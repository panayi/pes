import React from 'react';
import PropTypes from 'prop-types';
import EmailShareButton from 'components/EmailShareButton/EmailShareButton';

const EmailShareAdButton = ({ ad, ...rest }) => (
    <EmailShareButton
      subject={`${ad.title} at Pesposa`}
      body={'Check it out: {URL}'}
      {...rest}
    />
  );

EmailShareAdButton.propTypes = {
  ad: PropTypes.shape(),
};

EmailShareAdButton.defaultProps = {
  ad: {},
};

export default EmailShareAdButton;
