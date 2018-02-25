import React from 'react';
import PropTypes from 'prop-types';
import { TwitterShareButton as ReactTwitterShareButton } from 'react-share';
import { withStyles } from 'material-ui/styles';
import TwitterAvatar from 'components/TwitterAvatar/TwitterAvatar';

const styles = {
  root: {
    cursor: 'pointer',
  },
};

const TwitterShareButton = ({ url, title, via, hashTags, classes }) => (
  <ReactTwitterShareButton
    url={url}
    title={title}
    via={via}
    hashTags={hashTags}
    className={classes.root}
  >
    <TwitterAvatar />
  </ReactTwitterShareButton>
);

TwitterShareButton.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  via: PropTypes.string,
  hashTags: PropTypes.arrayOf(PropTypes.string),
};

TwitterShareButton.defaultProps = {
  title: null,
  via: null,
  hashTags: null,
};

export default withStyles(styles)(TwitterShareButton);
