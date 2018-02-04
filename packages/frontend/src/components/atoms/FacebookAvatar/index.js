import React from 'react';
import classNames from 'classnames';
import FacebookBoxIcon from 'mdi-react/FacebookIcon';
import { withStyles } from 'material-ui/styles';
import { colors } from 'pesposa-config';
import Avatar from 'material-ui/Avatar';

const styles = {
  root: {
    background: colors.FACEBOOK,
  },
};

const FacebookAvatar = ({ classes, className, iconProps, ...rest }) => (
  <Avatar className={classNames(classes.root, className)} {...rest}>
    <FacebookBoxIcon style={{ fill: 'white' }} {...iconProps} />
  </Avatar>
);

FacebookAvatar.defaultProps = {
  iconProps: {},
};

export default withStyles(styles)(FacebookAvatar);