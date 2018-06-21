import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import HeaderLogo from 'pages/components/HeaderLogo/HeaderLogo';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
};

const Header = ({ classes }) => (
  <div className={classes.root}>
    <HeaderLogo />
  </div>
);

export default withStyles(styles)(Header);
