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
import getMetaTags from 'utils/getMetaTags';
import defaultTheme from 'config/theme';
import { actions as modalActions } from 'store/modals';
import { actions as authActions } from 'store/firebase/auth';
import Layout from 'layouts/Layout/Layout';
import Login from 'modules/Login/Login';
import needsNonBetaUser from 'hocs/needsNonBetaUser';
import Button from 'components/Button/Button';
import ReduxModal from 'components/Modal/ReduxModal/ReduxModal';
import Logo from 'components/Logo/Logo';
import Spinner from 'components/Spinner/Spinner';
import CreateBetaUserFailed from './CreateBetaUserFailed/CreateBetaUserFailed';
import Waitlisted from './Waitlisted/Waitlisted';
import WaitlistedJoinButton from './Waitlisted/WaitlistedJoinButton/WaitlistedJoinButton';

// BETA
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
  },
  brand: {
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
      fontSize: '1.2em',
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
});

class Beta extends React.Component {
  handleCreateBetaUserFail = () => {
    this.props.setLoginSuccess(true);
    this.props.openModal('createBetaUserFailed');
  };

  handleCreateBetaUserSuccess = () => {
    this.props.history.replace('/');
  };

  handleLoginSuccess = async () => {
    const { code, email, createBetaUser, setIsCreatingBetaUser } = this.props;

    setIsCreatingBetaUser(true);
    const result = await createBetaUser({ code, email });

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

  renderJoinWaitlist() {
    const {
      hasBetaInvite,
      isCreatingBetaUser,
      openModal,
      location,
      classes,
    } = this.props;

    if (hasBetaInvite || isCreatingBetaUser) {
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
            <strong className={classes.name}>
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
      hasBetaInvite,
      isCreatingBetaUser,
      name,
      location,
      classes,
    } = this.props;

    if (!hasBetaInvite || isCreatingBetaUser) {
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
              Enter Pesposa
            </Button>
          </div>
          <Typography className={classes.body} color="inherit">
            <strong className={classes.name}>
              {isNilOrEmpty(name) ? 'Hello!' : `Hello ${name}!`}
            </strong>
            <span className={classes.fade}>
              Thanks for joining the new Pesposa.
            </span>
            <br />
            <span className={classes.fade}>
              Click the button above to create an account and enter the new
              Pesposa.
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
            Please wait while your beta account is created
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
          <div className={classes.root}>
            {this.renderJoinWaitlist()}
            {this.renderCreateBetaUser()}
            {this.renderIsCreatingBetaUser()}
          </div>
          <ReduxModal id="login" content={Login} />
          <ReduxModal
            id="createBetaUserFailed"
            content={CreateBetaUserFailed}
          />
        </Layout>
        <Waitlisted />
      </MuiThemeProvider>
    );
  }
}

const mapDispatchToProps = {
  createBetaUser: authActions.createBetaUser,
  logout: authActions.logout,
  openModal: modalActions.openModal,
};

export default R.compose(
  setStatic('getInitialProps', async ({ store }) => store.getState()),
  needsNonBetaUser,
  connect(null, mapDispatchToProps),
  withProps(props => {
    const search = R.pathOr('', ['location', 'search'], props);
    const params = qs.parse(search);
    const hasBetaInvite =
      !isNilOrEmpty(params.code) && !isNilOrEmpty(params.email);
    return {
      code: params.code,
      email: params.email,
      name: params.name,
      hasBetaInvite,
    };
  }),
  withState('loginSuccess', 'setLoginSuccess', false),
  withState('isCreatingBetaUser', 'setIsCreatingBetaUser', false),
  withStyles(styles),
)(Beta);
