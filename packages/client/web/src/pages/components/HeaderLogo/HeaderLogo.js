import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Link from '@pesposa/client-core/src/components/Link/Link';
import Logo from 'components/Logo/Logo';

const styles = theme => ({
  logoLink: {
    paddingLeft: theme.spacing.unit,
    color: '#16191C',
    '&:hover': {
      background: 'none',
    },
    [theme.breakpoints.down(theme.map.tablet)]: {
      paddingLeft: 0,
      paddingRight: theme.spacing.unit * 1.5,
    },
    '@media (max-width: 320px)': {
      display: 'none',
    },
  },
  logo: {
    width: 115,
    marginBottom: -4,
    height: 48,
    [theme.breakpoints.down(theme.map.tablet)]: {
      height: 44,
    },
  },
});

const HeaderLogo = ({ classes }) => (
  <Link to="/" exact className={classes.logoLink}>
    <Logo className={classes.logo} />
  </Link>
);

export default withStyles(styles)(HeaderLogo);
