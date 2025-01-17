import React from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import PhoneIcon from '@material-ui/icons/Phone';

const styles = {
  root: {
    background: '#47B22D',
  },
};

const PhoneAvatar = ({ classes, className, iconProps, ...rest }) => (
  <Avatar className={classNames(classes.root, className)} {...rest}>
    <PhoneIcon {...iconProps} />
  </Avatar>
);

PhoneAvatar.defaultProps = {
  iconProps: {},
};

export default withStyles(styles)(PhoneAvatar);
