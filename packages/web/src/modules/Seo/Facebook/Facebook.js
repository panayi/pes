import React from 'react';
import PropTypes from 'prop-types';

const Facebook = ({ siteName, userId, appId }) => (
  <React.Fragment>
    {siteName && <meta property="og:site_name" content={siteName} />}
    {userId && <meta property="fb:admins" content={userId} />}
    {appId && <meta property="fb:app_id" content={appId} />}
  </React.Fragment>
);

Facebook.propTypes = {
  siteName: PropTypes.string,
  userId: PropTypes.string,
  appId: PropTypes.string,
};

Facebook.defaultProps = {
  siteName: null,
  userId: null,
  appId: null,
};

export default Facebook;
