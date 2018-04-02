import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import classNames from 'classnames';
import queryString from 'query-string';
import { withProps, withState } from 'recompose';
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
import ReduxModal from 'components/Modal/ReduxModal/ReduxModal';
import Button from 'components/Button/Button';
import Logo from 'components/Logo/Logo';
import Spinner from 'components/Spinner/Spinner';
import LoginSuccess from './LoginSuccess/LoginSuccess';

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
  },
  brand: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
});

class Beta extends React.Component {
  getButtonLabel = () => {
    if (this.hasBetaInvite()) {
      return 'Create Account';
    }

    return 'Get Early Access';
  };

  hasBetaInvite = () => {
    const { code, email } = this.props;
    return !isNilOrEmpty(code) && !isNilOrEmpty(email);
  };

  handleCreateBetaUserFail = () => {
    this.props.setLoginSuccess(true);
    this.props.openModal('loginSuccess');
  };

  handleCreateBetaUserSuccess = () => {
    this.props.history.replace('/');
  };

  handleLoginSuccess = async () => {
    const { code, email, createBetaUser, setIsCreatingBetaUser } = this.props;

    if (!this.hasBetaInvite()) {
      return this.handleCreateBetaUserFail();
    }

    setIsCreatingBetaUser(true);
    const result = await createBetaUser({ code, email });

    if (result) {
      return this.handleCreateBetaUserSuccess();
    }

    setIsCreatingBetaUser(false);
    return this.handleCreateBetaUserFail();
  };

  renderBody = () => {
    const { name, loginSuccess, location, classes } = this.props;
    const buttonLabel = this.getButtonLabel();

    if (loginSuccess) {
      return null;
    }

    if (this.hasBetaInvite()) {
      return (
        <React.Fragment>
          <Helmet
            {...getMetaTags({
              title: `Pesposa Beta`,
              path: location.pathname,
            })}
          />
          <strong className={classes.name}>Hello {name || 'beta user'}!</strong>
          <span className={classes.fade}>
            Thanks for accepting the beta invitation.
          </span>
          <br />
          <span className={classes.fade}>
            Click the button above to create an account and enter the new
            Pesposa.
          </span>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <strong>The all new Pesposa is launching soon.</strong>
        <br />
        <span className={classes.fade}>
          {`Click "${buttonLabel}" to start using it today!`}
        </span>
      </React.Fragment>
    );
  };

  renderIsCreatingBetaUser() {
    const { classes } = this.props;

    return (
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
    );
  }

  renderDefault() {
    const { loginSuccess, openModal, classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.brand}>
          <Logo className={classes.logo} />
          <Typography className={classes.title} variant="title" color="inherit">
            Buy and sell stuff in Cyprus.
          </Typography>
        </div>
        <div className={classes.buttonWrap}>
          <Button
            className={classNames(classes.button, {
              [classes.disabled]: loginSuccess,
            })}
            disabled={loginSuccess}
            size="large"
            color="primary"
            variant="raised"
            fullWidth
            onClick={() =>
              openModal('login', { onSuccess: this.handleLoginSuccess })
            }
          >
            {loginSuccess ? 'Thank you!' : this.getButtonLabel()}
          </Button>
        </div>
        <Typography className={classes.body} color="inherit">
          {this.renderBody()}
        </Typography>
      </React.Fragment>
    );
  }

  render() {
    const { isCreatingBetaUser, classes } = this.props;

    return (
      <MuiThemeProvider theme={customTheme}>
        <Layout fixed>
          <div className={classes.root}>
            {isCreatingBetaUser
              ? this.renderIsCreatingBetaUser()
              : this.renderDefault()}
          </div>
          <ReduxModal id="login" content={Login} />
          <ReduxModal id="loginSuccess" content={LoginSuccess} />
        </Layout>
      </MuiThemeProvider>
    );
  }
}

const mapDispatchToProps = {
  createBetaUser: authActions.createBetaUser,
  openModal: modalActions.openModal,
};

export default R.compose(
  needsNonBetaUser,
  connect(null, mapDispatchToProps),
  withProps(props => {
    const search = R.pathOr('', ['location', 'search'], props);
    const params = queryString.parse(search);
    return {
      code: params.code,
      email: params.email,
      name: params.name,
    };
  }),
  withState('loginSuccess', 'setLoginSuccess', false),
  withState('isCreatingBetaUser', 'setIsCreatingBetaUser', false),
  withStyles(styles),
)(Beta);
