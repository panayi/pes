import React from 'react';
import Toolbar from 'material-ui/Toolbar';
import withStyles from 'material-ui/styles/withStyles';
import AppBar from 'components/AppBar/AppBar';

const styles = theme => ({
  appBar: {
    zIndex: 1201, // 1 more than sidebar
  },
  toolbar: {
    display: 'flex',
    flex: '1 1 auto',
    padding: 0,
    minHeight: theme.layout.headerHeight.phone,
    [theme.breakpoints.up(theme.map.tablet)]: {
      paddingRight: theme.spacing.unit * 2,
      paddingLeft: theme.spacing.unit * 2,
      minHeight: theme.layout.headerHeight.tablet,
    },
  },
});

const Header = ({ children, classes }) => (
  <AppBar className={classes.appBar}>
    <Toolbar className={classes.toolbar}>{children}</Toolbar>
  </AppBar>
);

export default withStyles(styles)(Header);
