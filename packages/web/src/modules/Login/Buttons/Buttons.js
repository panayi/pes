/* @flow */
import React from 'react';
import * as R from 'ramda';
import { withState } from 'recompose';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import * as firebaseConfig from '@pesposa/core/src/config/firebase';
import { actions as authActions } from 'store/firebase/auth';
import GeneralErrorMessage from 'components/GeneralErrorMessage/GeneralErrorMessage';
import LoginWithFacebook from './WithFacebook/WithFacebook';
import LoginWithGoogle from './WithGoogle/WithGoogle';

type Props = {
  onSuccess: Function,
  login: Function,
  errorMsg: boolean,
  setErrorMsg: Function,
  classes: Object,
};

const styles = theme => ({
  first: {
    marginTop: theme.spacing.unit,
  },
  second: {
    marginTop: theme.spacing.unit * 2,
  },
  error: {
    marginTop: theme.spacing.unit,
  },
});

class LoginButtons extends React.Component<Props> {
  login = (...args) => {
    const { login, onSuccess, setErrorMsg } = this.props;
    setErrorMsg(null);
    login(...args)
      .then(onSuccess)
      .catch(this.handleError);
  };

  handleError = error => {
    const errorCode = R.prop('code', error);
    const providerId = R.path(['credential', 'providerId'], error);
    const accountExists =
      errorCode === 'auth/account-exists-with-different-credential';
    let errorMsg = '';

    if (accountExists) {
      const otherProvider =
        providerId === firebaseConfig.PROVIDER_IDS.facebook
          ? 'Google'
          : 'Facebook';
      errorMsg = `You have already created an account using ${otherProvider}, please try clicking ${otherProvider} button.`;
    }

    this.props.setErrorMsg(errorMsg);
  };

  render() {
    const { errorMsg, classes } = this.props;

    return (
      <React.Fragment>
        <Grid item xs={12} className={classes.first}>
          <LoginWithFacebook login={this.login} fullWidth />
        </Grid>
        <Grid item xs={12} className={classes.second}>
          <LoginWithGoogle login={this.login} fullWidth />
        </Grid>
        {!R.isNil(errorMsg) && (
          <Grid item xs={12} className={classes.error}>
            {errorMsg ? (
              <Typography color="error">{errorMsg}</Typography>
            ) : (
              <GeneralErrorMessage />
            )}
          </Grid>
        )}
        <Grid item xs={12}>
          &nbsp;
        </Grid>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  login: authActions.login,
};

export default R.compose(
  connect(null, mapDispatchToProps),
  withState('errorMsg', 'setErrorMsg', null),
  withStyles(styles),
)(LoginButtons);
