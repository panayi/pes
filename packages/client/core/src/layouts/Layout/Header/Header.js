import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { renameProp } from 'recompose';
import Toolbar from '@material-ui/core/Toolbar';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '../../../components/AppBar/AppBar';

const styles = theme => ({
  appBar: {
    zIndex: 1201, // 1 more than sidebar
  },
  toolbar: {
    display: 'flex',
    flex: '1 1 auto',
    padding: 0,
    minHeight: theme.layout.headerHeight.phone,
    borderBottom: [1, 'solid', theme.palette.divider],
    [theme.breakpoints.up(theme.map.tablet)]: {
      paddingRight: theme.spacing.unit * 2,
      paddingLeft: theme.spacing.unit * 2,
      minHeight: theme.layout.headerHeight.tablet,
    },
  },
});

const Header = ({ children, classesFromProps, classes }) => (
  <AppBar className={classNames(classesFromProps.appBar, classes.appBar)}>
    <Toolbar className={classNames(classesFromProps.toolbar, classes.toolbar)}>
      {children}
    </Toolbar>
  </AppBar>
);

Header.defaultProps = {
  classesFromProps: {},
};

export default R.compose(
  renameProp('classes', 'classesFromProps'),
  withStyles(styles),
)(Header);
