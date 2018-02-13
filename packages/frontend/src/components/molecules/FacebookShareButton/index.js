import React from 'react';
import PropTypes from 'prop-types';
import { FacebookShareButton as ReactFacebookShareButton } from 'react-share';
import { withStyles } from 'material-ui/styles';
import FacebookAvatar from 'components/atoms/FacebookAvatar';

const styles = {
  root: {
    cursor: 'pointer',
  },
};

const FacebookShareButton = ({ url, quote, hashTag, classes }) => (
  <ReactFacebookShareButton
    url={url}
    quote={quote}
    hashTag={hashTag}
    className={classes.root}
  >
    <FacebookAvatar />
  </ReactFacebookShareButton>
);

FacebookShareButton.propTypes = {
  url: PropTypes.string.isRequired,
  quote: PropTypes.string,
  hashTag: PropTypes.string,
};

FacebookShareButton.defaultProps = {
  quote: null,
  hashTag: null,
};

export default withStyles(styles)(FacebookShareButton);
