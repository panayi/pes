import React from 'react';
import classNames from 'classnames';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import CheckIcon from '@material-ui/icons/Check';

const styles = theme => ({
  root: {
    justifyContent: 'flex-start',
    textAlign: 'left',
    width: '100%',
    minHeight: 'auto',
    padding: [2, 0],
    '&:hover': {
      textDecoration: 'underline',
      backgroundColor: 'transparent',
    },
    '& + &': {
      paddingTop: theme.spacing.unit / 2,
    },
  },
  text: {
    color: 'inherit',
  },
  icon: {
    visibility: 'hidden',
    width: 13,
    height: 13,
  },
  active: {
    color: theme.palette.primary.main,
    cursor: 'default',
    '&:hover': {
      textDecoration: 'none',
    },
    '& $text': {
      fontWeight: theme.typography.fontWeightMedium,
    },
    '& $icon': {
      visibility: 'visible',
    },
  },
});

const FilterOption = ({ active, onClick, children, classes }) => (
  <ListItem
    classes={{ root: classNames(classes.root, { [classes.active]: active }) }}
    onClick={onClick}
    button
    disableRipple
  >
    <ListItemText classes={{ primary: classes.text }} primary={children} />
    <CheckIcon className={classes.icon} />
  </ListItem>
);

export default withStyles(styles)(FilterOption);
