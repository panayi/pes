import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
import { FacebookShareButton as ReactFacebookShareButton } from 'react-share';
import IconButton from 'material-ui/IconButton';
import urlForPath from 'utils/urlForPath';
import FacebookAvatar from 'components/FacebookAvatar/FacebookAvatar';

const FacebookShareButton = ({
  path,
  quote,
  hashTag,
  component: Komponent,
  children,
}) => (
  <Komponent
    component={ReactFacebookShareButton}
    url={urlForPath(path)}
    quote={quote}
    hashTag={hashTag}
    tabIndex="0"
  >
    <FacebookAvatar />
    {children}
  </Komponent>
);

FacebookShareButton.propTypes = {
  path: PropTypes.string.isRequired,
  quote: PropTypes.string,
  hashTag: PropTypes.string,
  component: elementType,
  children: PropTypes.node,
};

FacebookShareButton.defaultProps = {
  quote: null,
  hashTag: null,
  component: IconButton,
  children: null,
};

export default FacebookShareButton;
