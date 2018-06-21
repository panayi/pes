import React from 'react';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
import EmailIcon from '@material-ui/icons/Email';

const styles = theme => ({
  root: {
    background: theme.palette.grey[400],
  },
});

const EmailAvatar = ({ classes, className, iconProps, ...rest }) => (
  <Avatar className={classNames(classes.root, className)} {...rest}>
    <EmailIcon style={{ fill: 'white' }} {...iconProps} />
  </Avatar>
);

EmailAvatar.defaultProps = {
  iconProps: {},
};

export default withStyles(styles)(EmailAvatar);
