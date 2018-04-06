import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { branch, renderNothing } from 'recompose';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  root: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
    fontWeight: 700,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    background: theme.palette.primary.main,
    textTransform: 'uppercase',
    [theme.breakpoints.down(theme.map.tablet)]: {
      bottom: theme.spacing.unit * 3,
      padding: [theme.spacing.unit, theme.spacing.unit * 2],
      borderRadius: 0,
    },
    [theme.breakpoints.up(theme.map.tablet)]: {
      top: 0,
      width: '100%',
      padding: [theme.spacing.unit * 2, 0],
      textAlign: 'center',
      borderRadius: [11, 0, 0, 0],
    },
  },
});

const SoldRibbon = ({ className, classes }) => (
  <Typography variant="title" className={classNames(classes.root, className)}>
    Sold
  </Typography>
);

export default R.compose(
  branch(R.complement(R.prop('sold')), renderNothing),
  withStyles(styles),
)(SoldRibbon);
