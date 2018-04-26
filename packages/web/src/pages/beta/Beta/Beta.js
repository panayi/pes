import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { setStatic } from 'recompose';
import { Helmet } from 'react-helmet';
import Typography from 'material-ui/Typography';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import withStyles from 'material-ui/styles/withStyles';
import getMetaTags from 'utils/getMetaTags';
import defaultTheme from 'config/theme';
import Layout from 'layouts/Layout/Layout';
import needsNonBetaUser from 'hocs/needsNonBetaUser';
import Imgix from 'components/Imgix/Imgix';
import Logo from 'components/Logo/Logo';
import Spinner from 'components/Spinner/Spinner';
import Waitlisted from '../Waitlisted/Waitlisted';

// BETA

const imgixParams = {
  auto: 'compress,format,enhance',
  blend: defaultTheme.palette.secondary.main,
  bm: 'saturation',
  balph: 80,
};

const customTheme = R.assocPath(
  ['overrides', 'MuiBackdrop'],
  null,
  defaultTheme,
);

const styles = theme => ({
  '@global': {
    body: {
      background: `${theme.palette.secondary.main} !important`,
    },
  },
  page: {
    height: '100%',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.common.white,
    [theme.breakpoints.up(theme.map.tablet)]: {
      justifyContent: 'space-evenly',
    },
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    [theme.breakpoints.down(theme.map.phone)]: {
      flex: 'none',
    },
  },
  brand: {
    flex: 2,
    [theme.breakpoints.down(theme.map.phone)]: {
      flex: 1,
    },
  },
  logo: {
    marginBottom: theme.spacing.unit * 2,
  },
  title: {
    fontSize: '2em',
  },
  wait: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100vw',
  },
  waitText: {
    marginTop: theme.spacing.unit * 3,
  },
  bg: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: -1,
    backgroundSize: 'cover',
    opacity: 0.05,
  },
});

class Beta extends React.Component {
  renderIsCreatingBetaUser() {
    const { location, classes } = this.props;

    return (
      <React.Fragment>
        <Helmet
          {...getMetaTags({
            path: location.pathname,
            title: `Please wait...`,
          })}
        />
        <div className={classes.wait}>
          <Spinner />
          <Typography
            className={classes.waitText}
            variant="title"
            color="inherit"
          >
            Please wait while your account is created
          </Typography>
        </div>
      </React.Fragment>
    );
  }

  render() {
    const { children, isCreatingBetaUser, classes } = this.props;

    return (
      <MuiThemeProvider theme={customTheme}>
        <Layout fixed pageClassName={classes.page}>
          <Imgix
            image={{ fullPath: 'uploads/beta-bg.jpg' }}
            params={imgixParams}
            lqip={false}
          >
            {({ src }) => (
              <React.Fragment>
                <div
                  className={classes.bg}
                  style={{ backgroundImage: `url(${src})` }}
                />
                <div className={classes.root}>
                  <div className={classNames(classes.item, classes.brand)}>
                    <Logo className={classes.logo} />
                    <Typography
                      className={classes.title}
                      variant="title"
                      color="inherit"
                    >
                      Buy and sell stuff in Cyprus.
                    </Typography>
                  </div>
                  {isCreatingBetaUser
                    ? this.renderIsCreatingBetaUser()
                    : children}
                </div>
              </React.Fragment>
            )}
          </Imgix>
        </Layout>
        <Waitlisted />
      </MuiThemeProvider>
    );
  }
}

export default R.compose(
  setStatic('getInitialProps', async ({ store }) => store.getState()),
  needsNonBetaUser,
  withStyles(styles),
)(Beta);
