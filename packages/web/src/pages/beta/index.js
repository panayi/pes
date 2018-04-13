import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import classNames from 'classnames';
import qs from 'querystringify';
import { withProps, withState, setStatic } from 'recompose';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Typography from 'material-ui/Typography';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import withStyles from 'material-ui/styles/withStyles';
import env from '@pesposa/core/src/config/env';
import getMetaTags from 'utils/getMetaTags';
import defaultTheme from 'config/theme';
import { actions as modalActions } from 'store/modals';
import { actions as authActions } from 'store/firebase/auth';
import Layout from 'layouts/Layout/Layout';
import Login from 'modules/Login/Login';
import needsNonBetaUser from 'hocs/needsNonBetaUser';
import Button from 'components/Button/Button';
import Imgix from 'components/Imgix/Imgix';
import ReduxModal from 'components/Modal/ReduxModal/ReduxModal';
import Logo from 'components/Logo/Logo';
import Spinner from 'components/Spinner/Spinner';
import CreateBetaUserFailed from './CreateBetaUserFailed/CreateBetaUserFailed';
import CreateBetaCodeAndUserFailed from './CreateBetaCodeAndUserFailed/CreateBetaCodeAndUserFailed';
import Waitlisted from './Waitlisted/Waitlisted';
import WaitlistedJoinButton from './Waitlisted/WaitlistedJoinButton/WaitlistedJoinButton';

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
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
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
  body: {
    marginBottom: theme.spacing.unit * 2,
    textAlign: 'center',
    [theme.breakpoints.up(theme.map.tablet)]: {
      marginBottom: theme.spacing.unit * 2.5,
      fontSize: '1.3em',
      lineHeight: '1.7em',
    },
  },
  name: {
    display: 'block',
    marginBottom: theme.spacing.unit * 2,
  },
  buttonWrap: {
    marginBottom: theme.spacing.unit * 4,
  },
  button: {
    width: 350,
    maxWidth: '80vw',
    minHeight: 52,
    fontSize: '1.25rem',
  },
  disabled: {
    background: 'inherit',
    color: 'inherit',
  },
  flex: {
    flex: 1,
  },
  fade: {
    opacity: 0.8,
  },
  link: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  wait: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
  },
  waitText: {
    marginTop: theme.spacing.unit * 3,
  },
  loginButton: {
    color: theme.palette.common.white,
    borderColor: theme.palette.common.white,
    marginTop: theme.spacing.unit,
    [theme.breakpoints.up(theme.map.laptop)]: {
      position: 'absolute',
      top: theme.spacing.unit * 3,
      right: theme.spacing.unit * 4,
      fontSize: theme.typography.subheading.fontSize,
    },
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
  componentDidMount() {
    if (env.firebaseProject === 'pesposa-production') {
      /* eslint-disable */

      // Hotjar Tracking Code for beta.pesposa.com/beta
      (function(h, o, t, j, a, r) {
        h.hj =
          h.hj ||
          function() {
            (h.hj.q = h.hj.q || []).push(arguments);
          };
        h._hjSettings = { hjid: 845878, hjsv: 6 };
        a = o.getElementsByTagName('head')[0];
        r = o.createElement('script');
        r.async = 1;
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        a.appendChild(r);
      })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');

      // Facebook pixel tracking code
      !(function(f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        'script',
        'https://connect.facebook.net/en_US/fbevents.js',
      );
      fbq('init', '423541348091230');
      fbq('track', 'PageView');
      /* eslint-enable */
    }
  }

  handleCreateBetaUserFail = () => {
    this.props.openModal('createBetaUserFailed');
  };

  handleCreateBetaCodeAndUserFail = () => {
    this.props.openModal('createBetaCodeAndUserFailed');
  };

  handleCreateBetaUserSuccess = () => {
    this.props.history.replace('/');
  };

  handleLoginSuccess = async () => {
    const { code, createBetaUser, setIsCreatingBetaUser } = this.props;

    setIsCreatingBetaUser(true);
    const result = await createBetaUser(code);

    if (result) {
      return this.handleCreateBetaUserSuccess();
    }

    setIsCreatingBetaUser(false);
    return this.handleCreateBetaUserFail();
  };

  handleLoginClick = async () => {
    const { logout, openModal } = this.props;
    await logout();
    openModal('login', { onSuccess: this.handleLoginSuccess });
  };

  handleInstantLoginSuccess = async () => {
    const { createBetaCodeAndUser, setIsCreatingBetaUser } = this.props;

    setIsCreatingBetaUser(true);
    const result = await createBetaCodeAndUser();

    if (result) {
      return this.handleCreateBetaUserSuccess();
    }

    setIsCreatingBetaUser(false);
    return this.handleCreateBetaCodeAndUserFail();
  };

  handleInstantLoginClick = async () => {
    const { logout, openModal } = this.props;
    await logout();
    openModal('login', {
      disablePhone: true,
      onSuccess: this.handleInstantLoginSuccess,
      title: 'Create an account to enter the new Pesposa',
    });
  };

  renderInstantCreateBetaUser() {
    const {
      instantCreateBetaUser,
      isCreatingBetaUser,
      openModal,
      location,
      classes,
    } = this.props;

    if (!instantCreateBetaUser || isCreatingBetaUser) {
      return null;
    }

    return (
      <React.Fragment>
        <Helmet
          {...getMetaTags({
            path: location.pathname,
            title: `Welcome to the new Pesposa`,
          })}
        />
        <div className={classNames(classes.item, classes.brand)}>
          <Logo className={classes.logo} />
          <Typography className={classes.title} variant="title" color="inherit">
            Buy and sell stuff in Cyprus.
          </Typography>
        </div>
        <div className={classes.item}>
          <div className={classes.buttonWrap}>
            <Button
              className={classes.button}
              size="large"
              color="primary"
              variant="raised"
              fullWidth
              onClick={this.handleInstantLoginClick}
            >
              Create an account
            </Button>
          </div>
          <Typography className={classes.body} color="inherit">
            <strong className={classes.name} style={{ marginBottom: 0 }}>
              Welcome to the new Pesposa!
            </strong>
            <span className={classes.fade}>
              Create an account to enter.&nbsp;
            </span>
            <span
              className={classNames(classes.link, classes.fade)}
              role="button"
              tabIndex="-1"
              onClick={() => openModal('login')}
            >
              Already have an account?
            </span>
          </Typography>
        </div>
      </React.Fragment>
    );
  }

  renderJoinWaitlist() {
    const {
      hasBetaInviteCode,
      instantCreateBetaUser,
      isCreatingBetaUser,
      openModal,
      location,
      classes,
    } = this.props;

    if (hasBetaInviteCode || instantCreateBetaUser || isCreatingBetaUser) {
      return null;
    }

    return (
      <React.Fragment>
        <Helmet
          {...getMetaTags({
            path: location.pathname,
            title: `The new Pesposa is launching soon. Join the waitlist!`,
            description:
              'People are selling stuff on Pesposa. Join the waitlist to become one of the earliest users of the new Pesposa!',
          })}
        />
        <Button
          className={classes.loginButton}
          variant="outline"
          onClick={() => openModal('login')}
        >
          Login
        </Button>
        <div className={classNames(classes.item, classes.brand)}>
          <Logo className={classes.logo} />
          <Typography className={classes.title} variant="title" color="inherit">
            Buy and sell stuff in Cyprus.
          </Typography>
        </div>
        <div className={classes.item}>
          <div className={classes.buttonWrap}>
            <WaitlistedJoinButton
              className={classes.button}
              size="large"
              color="primary"
              variant="raised"
              fullWidth
            >
              Join the Waitlist
            </WaitlistedJoinButton>
          </div>
          <Typography className={classes.body} color="inherit">
            <strong className={classes.name} style={{ marginBottom: 0 }}>
              The all new Pesposa is launching soon.
            </strong>
            <span className={classes.fade}>
              Join the waitlist to become one of the earliest users of the new
              Pesposa!
            </span>
          </Typography>
        </div>
      </React.Fragment>
    );
  }

  renderCreateBetaUser() {
    const {
      hasBetaInviteCode,
      isCreatingBetaUser,
      name,
      location,
      classes,
    } = this.props;

    if (!hasBetaInviteCode || isCreatingBetaUser) {
      return null;
    }

    return (
      <React.Fragment>
        <Helmet
          {...getMetaTags({
            path: location.pathname,
            title: `Welcome to the new Pesposa`,
          })}
        />
        <div className={classNames(classes.item, classes.brand)}>
          <Logo className={classes.logo} />
          <Typography className={classes.title} variant="title" color="inherit">
            Buy and sell stuff in Cyprus.
          </Typography>
        </div>
        <div className={classes.item}>
          <div className={classes.buttonWrap}>
            <Button
              className={classes.button}
              size="large"
              color="primary"
              variant="raised"
              fullWidth
              onClick={this.handleLoginClick}
            >
              Create an account
            </Button>
          </div>
          <Typography className={classes.body} color="inherit">
            <strong className={classes.name}>
              {isNilOrEmpty(name) ? 'Hello!' : `Hello ${name},`}
            </strong>
            <span className={classes.fade}>
              You are almost ready to join the new Pesposa!
            </span>
            <br />
            <span className={classes.fade}>
              Just click the button above to create an account.
            </span>
          </Typography>
        </div>
      </React.Fragment>
    );
  }

  renderIsCreatingBetaUser() {
    const { isCreatingBetaUser, location, classes } = this.props;

    if (!isCreatingBetaUser) {
      return null;
    }

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
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={customTheme}>
        <Layout fixed>
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
                  {this.renderInstantCreateBetaUser()}
                  {this.renderJoinWaitlist()}
                  {this.renderCreateBetaUser()}
                  {this.renderIsCreatingBetaUser()}
                </div>
                <ReduxModal id="login" content={Login} />
                <ReduxModal
                  id="createBetaUserFailed"
                  content={CreateBetaUserFailed}
                />
                <ReduxModal
                  id="createBetaCodeAndUserFailed"
                  content={CreateBetaCodeAndUserFailed}
                />
              </React.Fragment>
            )}
          </Imgix>
        </Layout>
        <Waitlisted />
      </MuiThemeProvider>
    );
  }
}

const mapDispatchToProps = {
  createBetaUser: authActions.createBetaUser,
  createBetaCodeAndUser: authActions.createBetaCodeAndUser,
  logout: authActions.logout,
  openModal: modalActions.openModal,
};

export default R.compose(
  setStatic('getInitialProps', async ({ store }) => store.getState()),
  needsNonBetaUser,
  connect(null, mapDispatchToProps),
  withProps(props => {
    const pathname = R.path(['location', 'pathname'], props);
    const search = R.pathOr('', ['location', 'search'], props);
    const params = qs.parse(search);
    const instantCreateBetaUser = pathname === '/beta/in';
    const hasBetaInviteCode = !isNilOrEmpty(params.code);
    return {
      code: params.code,
      name: params.name,
      instantCreateBetaUser,
      hasBetaInviteCode,
    };
  }),
  withState('isCreatingBetaUser', 'setIsCreatingBetaUser', false),
  withStyles(styles),
)(Beta);
