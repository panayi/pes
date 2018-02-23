import React from 'react';
import PropTypes from 'prop-types';
import { EmailShareButton as ReactEmailShareButton } from 'react-share';
import { withStyles } from 'material-ui/styles';
import EmailAvatar from 'components/EmailAvatar/EmailAvatar';

const styles = {
  root: {
    cursor: 'pointer',
  },
};

const EmailShareButton = ({ url, subject, body, classes }) => (
  <ReactEmailShareButton
    url={url}
    subject={subject}
    body={body}
    className={classes.root}
  >
    <EmailAvatar />
  </ReactEmailShareButton>
);

EmailShareButton.propTypes = {
  url: PropTypes.string.isRequired,
  subject: PropTypes.string,
  body: PropTypes.string,
};

EmailShareButton.defaultProps = {
  subject: null,
  body: null,
};

export default withStyles(styles)(EmailShareButton);
