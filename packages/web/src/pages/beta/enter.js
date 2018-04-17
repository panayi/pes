import React from 'react';
import * as R from 'ramda';
import { withState } from 'recompose';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import getMetaTags from 'utils/getMetaTags';
import { actions as modalActions } from 'store/modals';
import { actions as authActions } from 'store/firebase/auth';
import Login from 'modules/Login/Login';
import Button from 'components/Button/Button';
import ReduxModal from 'components/Modal/ReduxModal/ReduxModal';
import NonBetaUserMessage from './NonBetaUserMessage/NonBetaUserMessage';
import Beta from './Beta/Beta';

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
});

class Enter extends React.Component {
  handleSuccess = () => {
    this.props.history.replace('/');
  };

  handleFail = () => {
    this.props.openModal('nonBetaUserMessage');
  };

  handleInstantLoginSuccess = async () => {
    const { createBetaCodeAndUser, setIsCreatingBetaUser } = this.props;

    setIsCreatingBetaUser(true);
    const result = await createBetaCodeAndUser();

    if (result) {
      return this.handleSuccess();
    }

    setIsCreatingBetaUser(false);
    return this.handleFail();
  };

  handleInstantLoginClick = async title => {
    const { logout, openModal } = this.props;
    await logout();
    openModal('login', {
      disablePhone: true,
      onSuccess: this.handleInstantLoginSuccess,
      title,
    });
  };

  renderContent() {
    const { classes } = this.props;

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
                this.handleInstantLoginClick(
                  'Create an account to enter the new Pesposa',
                )
              }
            >
              Create an account
            </Button>
          </div>
          <Typography className={classes.body} color="inherit">
            <strong className={classes.name} style={{ marginBottom: 0 }}>
              Welcome to the new Pesposa!
            </strong>
            <span className={classes.fade}>Create an account to continue</span>
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
            title: 'Welcome to the new Pesposa',
            description:
              'The new Pesposa is easier and faster to use. Try it today!',
          })}
        />
        {this.renderContent()}
        <ReduxModal id="login" content={Login} />
        <ReduxModal id="nonBetaUserMessage" content={NonBetaUserMessage} />
      </Beta>
    );
  }
}

const mapDispatchToProps = {
  createBetaCodeAndUser: authActions.createBetaCodeAndUser,
  logout: authActions.logout,
  openModal: modalActions.openModal,
};

export default R.compose(
  connect(null, mapDispatchToProps),
  withState('isCreatingBetaUser', 'setIsCreatingBetaUser', false),
  withStyles(styles),
)(Enter);
