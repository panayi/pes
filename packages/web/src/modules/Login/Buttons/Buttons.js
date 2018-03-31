/* @flow */
import React from 'react';
import * as R from 'ramda';
import { withState } from 'recompose';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import withStyles from 'material-ui/styles/withStyles';
import { actions as authActions } from 'store/firebase/auth';
import TextDivider from 'components/TextDivider/TextDivider';
import GeneralErrorMessage from 'components/GeneralErrorMessage/GeneralErrorMessage';
import LoginWithFacebook from './WithFacebook/WithFacebook';
import LoginWithGoogle from './WithGoogle/WithGoogle';

type Props = {
  onSuccess: Function,
  login: Function,
  errored: boolean,
  setErrored: Function,
  classes: Object,
};

const styles = theme => ({
  first: {
    marginTop: 3 * theme.spacing.unit,
  },
  divider: {
    marginTop: 5 * theme.spacing.unit,
    marginBottom: 2 * theme.spacing.unit,
  },
});

class LoginButtons extends React.Component<Props> {
  login = (...args) => {
    const { login, onSuccess, setErrored } = this.props;
    setErrored(false);
    login(...args)
      .then(onSuccess)
      .catch(this.handleError);
  };

  handleError = () => {
    this.props.setErrored(true);
  };

  render() {
    const { errored, classes } = this.props;

    return (
      <React.Fragment>
        <Grid item xs={12} className={classes.first}>
          <LoginWithFacebook login={this.login} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <LoginWithGoogle login={this.login} fullWidth />
        </Grid>
        {errored && (
          <Grid item xs={12}>
            <GeneralErrorMessage />
          </Grid>
        )}
        <Grid item xs={1} />
        <Grid item xs={10} className={classes.divider}>
          <TextDivider variant="subheading" color="textSecondary">
            or login with your phone
          </TextDivider>
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
  withState('errored', 'setErrored', false),
  withStyles(styles),
)(LoginButtons);
