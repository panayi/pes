import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import GoogleIcon from 'components/atoms/GoogleIcon';

const styles = theme => ({
  root: {
    background: theme.palette.common.white,
  },
});

const GoogleAvatar = ({ classes, className, iconProps, ...rest }) => (
  <Avatar className={classNames(classes.root, className)} {...rest}>
    <GoogleIcon width={30} height={30} {...iconProps} />
  </Avatar>
);

GoogleAvatar.defaultProps = {
  iconProps: {},
};

export default withStyles(styles)(GoogleAvatar);
