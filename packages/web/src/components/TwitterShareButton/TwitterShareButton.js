import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
import { TwitterShareButton as ReactTwitterShareButton } from 'react-share';
import IconButton from 'material-ui/IconButton';
import * as pesposaConfig from '@pesposa/core/src/config/pesposa';
import urlForPath from 'utils/urlForPath';
import TwitterAvatar from 'components/TwitterAvatar/TwitterAvatar';

const TwitterShareButton = ({
  path,
  title,
  via,
  hashTags,
  component: Komponent,
  children,
}) => (
  <Komponent
    component={ReactTwitterShareButton}
    url={urlForPath(path)}
    title={title}
    via={via}
    hashTags={hashTags}
    tabIndex="0"
  >
    <TwitterAvatar />
    {children}
  </Komponent>
);

TwitterShareButton.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string,
  via: PropTypes.string,
  hashTags: PropTypes.arrayOf(PropTypes.string),
  component: elementType,
  children: PropTypes.node,
};

TwitterShareButton.defaultProps = {
  title: null,
  via: pesposaConfig.TWITTER_HANDLE,
  hashTags: null,
  component: IconButton,
  children: null,
};

export default TwitterShareButton;
