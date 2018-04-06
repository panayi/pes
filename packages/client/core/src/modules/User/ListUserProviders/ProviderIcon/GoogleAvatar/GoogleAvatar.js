import React from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import GoogleIcon from '../../../../../components/GoogleIcon/GoogleIcon';

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
