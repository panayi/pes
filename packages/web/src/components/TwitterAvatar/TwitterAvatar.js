import React from 'react';
import classNames from 'classnames';
import TwitterIcon from 'mdi-react/TwitterIcon';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import * as colors from '@pesposa/core/src/config/colors';

const styles = {
  root: {
    background: colors.TWITTER,
  },
};

const TwitterAvatar = ({ classes, className, iconProps, ...rest }) => (
  <Avatar className={classNames(classes.root, className)} {...rest}>
    <TwitterIcon style={{ fill: 'white' }} {...iconProps} />
  </Avatar>
);

TwitterAvatar.defaultProps = {
  iconProps: {},
};

export default withStyles(styles)(TwitterAvatar);
