import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    boxShadow: 'none',
    zIndex: 1201, // 1 more than sidebar
  },
  toolbar: {
    display: 'flex',
    flex: '1 1 auto',
    padding: 0,
  },
};

const Header = ({ children, classes }) => (
  <AppBar className={classes.root}>
    <Toolbar className={classes.toolbar}>
      {children}
    </Toolbar>
  </AppBar>
);


export default withStyles(styles)(
  Header,
);
