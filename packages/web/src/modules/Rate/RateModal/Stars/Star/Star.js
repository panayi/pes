import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import StarIcon from 'material-ui-icons/Star';

const styles = theme => ({
  root: {
    width: 36,
    height: 36,
    color: theme.palette.action.disabledBackground,
    transition: theme.transitions.create('color'),
  },
  active: {
    color: `${theme.palette.primary.main} !important`,
  },
  hovered: {
    color: theme.palette.action.disabled,
  },
});

const Star = ({ active, hovered, classes, ...rest }) => (
  <StarIcon
    className={classNames(classes.root, {
      [classes.active]: active,
      [classes.hovered]: hovered,
    })}
    {...rest}
  />
);

export default withStyles(styles)(Star);
