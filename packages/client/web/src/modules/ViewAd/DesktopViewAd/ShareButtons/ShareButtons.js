import React from 'react';
import { withRouter } from 'react-router-dom';
import FacebookShareButton from 'components/FacebookShareButton/FacebookShareButton';
import TwitterShareAdButton from '../../TwitterShareAdButton/TwitterShareAdButton';
import EmailShareAdButton from '../../EmailShareAdButton/EmailShareAdButton';

const ShareButtons = ({ ad, location }) => {
  const path = location.pathname;

  return (
    <React.Fragment>
      <FacebookShareButton path={path} />
      <TwitterShareAdButton path={path} ad={ad} />
      <EmailShareAdButton path={path} ad={ad} />
    </React.Fragment>
  );
};

export default withRouter(ShareButtons);
