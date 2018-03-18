import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
import { EmailShareButton as ReactEmailShareButton } from 'react-share';
import IconButton from 'material-ui/IconButton';
import urlForPath from 'utils/urlForPath';
import EmailAvatar from 'components/EmailAvatar/EmailAvatar';

const EmailShareButton = ({
  path,
  subject,
  body,
  component: Komponent,
  children,
}) => {
  const url = urlForPath(path);
  const finalBody = R.replace('{URL}', url, body);

  return (
    <Komponent
      component={ReactEmailShareButton}
      url={url}
      subject={subject}
      body={finalBody}
      tabIndex="0"
    >
      <EmailAvatar />
      {children}
    </Komponent>
  );
};

EmailShareButton.propTypes = {
  path: PropTypes.string.isRequired,
  subject: PropTypes.string,
  body: PropTypes.string,
  component: elementType,
  children: PropTypes.node,
};

EmailShareButton.defaultProps = {
  subject: null,
  body: null,
  component: IconButton,
  children: null,
};

export default EmailShareButton;
