import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import classNames from 'classnames';
import qs from 'querystringify';
import { withProps, withState, setStatic } from 'recompose';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import getMetaTags from 'utils/getMetaTags';
import { actions as modalActions } from 'store/modals';
import { actions as authActions } from 'store/firebase/auth';
import Login from 'modules/Login/Login';
import Button from 'components/Button/Button';
import ReduxModal from 'components/Modal/ReduxModal/ReduxModal';
import Beta from './Beta/Beta';
import CreateBetaUserFailed from './CreateBetaUserFailed/CreateBetaUserFailed';
import NonBetaUserMessage from './NonBetaUserMessage/NonBetaUserMessage';

// BETA

const styles = theme => ({
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
    [theme.breakpoints.down(theme.map.phone)]: {
      marginBottom: theme.spacing.unit * 2,
    },
  },
  button: {
    width: 350,
    maxWidth: '80vw',
    minHeight: 52,
    fontSize: '1.25rem',
  },
  fade: {
    opacity: 0.8,
  },
  link: {
    textDecoration: 'underline',
    color: 'inherit',
  },
});

class BetaLogin extends React.Component {
  handleCreateBetaUserFail = () => {
    this.props.openModal('createBetaUserFailed');
  };

  handleLoginFail = () => {
    this.props.openModal('nonBetaUserMessage');
  };

  handleCreateBetaUserSuccess = () => {
    this.props.history.replace('/');
  };

  handleLoginSuccess = async () => {
    const {
      code,
      hasBetaInviteCode,
      createBetaUser,
      setIsCreatingBetaUser,
    } = this.props;

    setIsCreatingBetaUser(true);
    const result = await createBetaUser(code);

    if (result) {
      return this.handleCreateBetaUserSuccess();
    }

    setIsCreatingBetaUser(false);

    return hasBetaInviteCode
      ? this.handleCreateBetaUserFail()
      : this.handleLoginFail();
  };

  handleLoginClick = async title => {
    const { logout, openModal } = this.props;
    await logout();
    openModal('login', {
      title,
      disablePhone: true,
      onSuccess: this.handleLoginSuccess,
    });
  };

  renderCreateBetaUser() {
    const { hasBetaInviteCode, name, classes } = this.props;

    if (!hasBetaInviteCode) {
      return null;
    }

    return (
      <React.Fragment>
        <div className={classes.item}>
          <div className={classes.buttonWrap}>
            <Button
              className={classes.button}
              size="large"
              color="primary"
              variant="raised"
              fullWidth
              onClick={() =>
                this.handleLoginClick(
                  'Create an account to enter the new Pesposa',
                )
              }
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

  renderLogin() {
    const { hasBetaInviteCode, classes } = this.props;

    if (hasBetaInviteCode) {
      return null;
    }

    return (
      <React.Fragment>
        <div className={classes.item}>
          <div className={classes.buttonWrap}>
            <Button
              className={classes.button}
              size="large"
              color="primary"
              variant="raised"
              fullWidth
              onClick={() => this.handleLoginClick()}
            >
              Login
            </Button>
          </div>
          <Typography className={classes.body} color="inherit">
            <span className={classes.fade}>
              Don&apos;t have an account?&nbsp;
            </span>
            <NavLink
              to="/join"
              className={classNames(classes.link, classes.fade)}
            >
              Join the waiting list
            </NavLink>
          </Typography>
        </div>
      </React.Fragment>
    );
  }

  render() {
    const { isCreatingBetaUser, location } = this.props;

    return (
      <Beta isCreatingBetaUser={isCreatingBetaUser}>
        <Helmet
          {...getMetaTags({
            path: location.pathname,
            title: `Welcome to the new Pesposa`,
          })}
        />
        {this.renderCreateBetaUser()}
        {this.renderLogin()}
        <ReduxModal id="login" content={Login} />
        <ReduxModal id="createBetaUserFailed" content={CreateBetaUserFailed} />
        <ReduxModal id="nonBetaUserMessage" content={NonBetaUserMessage} />
      </Beta>
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
  connect(null, mapDispatchToProps),
  withProps(props => {
    const search = R.pathOr('', ['location', 'search'], props);
    const params = qs.parse(search);
    const hasBetaInviteCode = !isNilOrEmpty(params.code);
    return {
      code: params.code,
      name: params.name,
      hasBetaInviteCode,
    };
  }),
  withState('isCreatingBetaUser', 'setIsCreatingBetaUser', false),
  withStyles(styles),
)(BetaLogin);
