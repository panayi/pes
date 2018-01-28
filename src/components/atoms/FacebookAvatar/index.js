import React from 'react';
import classNames from 'classnames';
import FacebookBoxIcon from 'mdi-react/FacebookIcon';
import { withStyles } from 'material-ui/styles';
import * as colorConstants from 'constants/colors';
import Avatar from 'material-ui/Avatar';

const styles = {
  root: {
    background: colorConstants.FACEBOOK,
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
