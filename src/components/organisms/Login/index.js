/* @flow */
import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setDisplayName, withState } from 'recompose';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import { factory as modalFactory } from 'store/modals';
import { selectors as profileSelectors } from 'store/firebase/profile';
import withSpinnerWhen from 'components/hocs/withSpinnerWhen';
import LoginWithPhone from 'components/molecules/LoginWithPhone';
import LoginButtons from './LoginButtons';

type Props = {
  hideModal: Function,
  renderContent: Function,
  isProfileLoaded: boolean,
  loginWithPhoneStep: string,
  setLoginWithPhoneStep: Function,
  spinner: React$Element<*>,
  classes: Object,
};

const styles = {
  root: {
    width: 370,
  },
};

const Login = ({
  hideModal,
  renderContent,
  spinner,
  loginWithPhoneStep,
  setLoginWithPhoneStep,
  classes,
}: Props) =>
  renderContent(
    <div className={classes.root}>
      {spinner}
      <Grid container alignContent="center">
        {loginWithPhoneStep !== 'smsCodeValidation' && (
          <LoginButtons onSuccess={hideModal} />
        )}
        <Grid item xs={12}>
          <LoginWithPhone
            onSuccess={hideModal}
            step={loginWithPhoneStep}
            onStepChange={setLoginWithPhoneStep}
          />
        </Grid>
      </Grid>
    </div>,
  );

const mapStateToProps = createStructuredSelector({
  isProfileLoaded: profileSelectors.isProfileLoadedSelector,
});

const ConnectedLogin = R.compose(
  setDisplayName('Login'),
  connect(mapStateToProps),
  withSpinnerWhen(R.propSatisfies(R.not, 'isProfileLoaded'), {
    centered: true,
    overlay: true,
  }),
  withState('loginWithPhoneStep', 'setLoginWithPhoneStep', 'phoneNumber'),
  withStyles(styles),
)(Login);

export default modalFactory({
  content: ConnectedLogin,
  closeButton: true,
});
