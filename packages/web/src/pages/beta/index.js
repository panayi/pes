import React from 'react';
import * as R from 'ramda';
import { isArray } from 'ramda-adjunct';
import classNames from 'classnames';
import { createSelector, createStructuredSelector } from 'reselect';
import { connectData } from 'lib/connectData';
import Typography from 'material-ui/Typography';
import { MuiThemeProvider, withStyles } from 'material-ui/styles';
import defaultTheme from 'config/theme';
import { actions as modalActions } from 'store/modals';
import { models } from 'store/firebase/data';
import { selectors as profileSelectors } from 'store/firebase/profile';
import Layout from 'layouts/Layout/Layout';
import Login from 'modules/Login/Login';
import ReduxModal from 'components/Modal/ReduxModal/ReduxModal';
import Button from 'components/Button/Button';
import Logo from '../components/Logo/Logo';
import LoginSuccess from './LoginSuccess/LoginSuccess';

// BETA

export const BETA_ENABLED = process.env.RAZZLE_BETA;

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
  button: {
    width: 350,
    maxWidth: '80vw',
    minHeight: 52,
    marginBottom: theme.spacing.unit * 3,
    fontSize: '1.25rem',
  },
  disabled: {
    background: 'inherit',
    color: 'inherit',
  },
  footer: {
    paddingBottom: theme.spacing.unit,
    textAlign: 'center',
    [theme.breakpoints.up(theme.map.tablet)]: {
      paddingBottom: theme.spacing.unit * 1.5,
      fontSize: '1.2em',
      lineHeight: '1.7em',
    },
  },
  flex: {
    flex: 1,
  },
  fade: {
    opacity: 0.8,
  },
});

class Beta extends React.Component {
  state = {
    loginSuccess: false,
  };

  componentWillMount() {
    if (!BETA_ENABLED || this.props.isBetaUser) {
      this.goHome();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isBetaUser) {
      this.goHome();
    }
  }

  goHome = () => {
    this.props.history.replace('/');
  };

  handleLoginSuccess = () => {
    const { isBetaUser, history, openModal } = this.props;

    if (isBetaUser) {
      history.replace('/');
    } else {
      this.setState({
        loginSuccess: true,
      });
      openModal('loginSuccess');
    }

    // Then in server.js:
    // In `get('/*')`: check if user is in betaUsers. If not, redirect to this page
  };

  render() {
    const { openModal, classes } = this.props;
    const { loginSuccess } = this.state;

    return (
      <MuiThemeProvider theme={customTheme}>
        <Layout fixed>
          <div className={classes.root}>
            <div className={classes.brand}>
              <Logo className={classes.logo} />
              <Typography
                className={classes.title}
                variant="title"
                color="inherit"
              >
                Buy and sell stuff in Cyprus.
              </Typography>
            </div>
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
              {loginSuccess ? 'Thank you!' : 'Get Early Access'}
            </Button>
            <Typography className={classes.footer} color="inherit">
              <strong>The all new Pesposa is launching soon.</strong>
              <br />
              <span className={classes.fade}>
                {'Click "Get Early Access" to start using it today!'}
              </span>
            </Typography>
          </div>
          <ReduxModal id="login" content={Login} />
          <ReduxModal id="loginSuccess" content={LoginSuccess} />
        </Layout>
      </MuiThemeProvider>
    );
  }
}

export const isBetaUserSelector = createSelector(
  profileSelectors.profileEmailSelector,
  profileSelectors.profilePhoneNumberSelector,
  profileSelectors.providerIdsSelector,
  R.compose(R.defaultTo([]), models.betaUsers.all.selector),
  (email, phoneNumber, providerIds, betaUsers) =>
    R.find(
      R.anyPass([
        betaUser => email && betaUser.email && betaUser.email === email,
        betaUser =>
          phoneNumber &&
          betaUser.phoneNumber &&
          betaUser.phoneNumber === phoneNumber,
        betaUser =>
          isArray(providerIds) &&
          betaUser.providerId &&
          R.contains(betaUser.providerId, providerIds),
      ]),
      betaUsers,
    ),
);

const mapDataToProps = {
  betaUsers: models.betaUsers.all,
};

const mapStateToProps = createStructuredSelector({
  isBetaUser: isBetaUserSelector,
});

const mapDispatchToProps = {
  openModal: modalActions.openModal,
};

export default R.compose(
  connectData(mapDataToProps, mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(Beta);
