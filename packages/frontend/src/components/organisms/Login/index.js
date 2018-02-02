/* @flow */
import React from 'react';
import * as R from 'ramda';
import { noop } from 'ramda-adjunct';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setDisplayName, withProps, withState } from 'recompose';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import ArrowBack from 'material-ui-icons/ArrowBack';
import { factory as modalFactory } from 'store/modals';
import { selectors as loginSelectors } from 'store/login';
import renderNothingWhen from 'components/hocs/renderNothingWhen';
import withSpinnerWhen from 'components/hocs/withSpinnerWhen';
import LoginWithPhone from 'components/molecules/LoginWithPhone';
import LoginButtons from './LoginButtons';

type Props = {
  onSuccess: Function,
  renderTitle: Function,
  renderContent: Function,
  loginWithPhoneStep: string,
  setLoginWithPhoneStep: Function,
  spinner: React$Element<*>,
  classes: Object,
};

const styles = () => ({
  root: {
    width: 370,
  },
  goBack: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

const Login = ({
  onSuccess,
  renderTitle,
  renderContent,
  spinner,
  loginWithPhoneStep,
  setLoginWithPhoneStep,
  classes,
}: Props) => {
  const showingSmsCodeValidation = loginWithPhoneStep === 'smsCodeValidation';

  return (
    <React.Fragment>
      {showingSmsCodeValidation &&
        renderTitle(
          <IconButton
            className={classes.goBack}
            onClick={() => setLoginWithPhoneStep('phoneNumber')}
          >
            <ArrowBack />
          </IconButton>,
        )}
      {renderContent(
        <div className={classes.root}>
          {spinner}
          <Grid container alignContent="center">
            {!showingSmsCodeValidation && (
              <LoginButtons onSuccess={onSuccess} />
            )}
            <Grid item xs={12}>
              <LoginWithPhone
                onSuccess={onSuccess}
                step={loginWithPhoneStep}
                onStepChange={setLoginWithPhoneStep}
              />
            </Grid>
          </Grid>
        </div>,
      )}
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoginPending: loginSelectors.pendingSelector,
  loginSucceeded: loginSelectors.succeededSelector,
});

const ConnectedLogin = R.compose(
  setDisplayName('Login'),
  connect(mapStateToProps),
  renderNothingWhen(R.prop('loginSucceeded')),
  withSpinnerWhen(R.prop('isLoginPending'), {
    centered: true,
    overlay: true,
  }),
  withState('loginWithPhoneStep', 'setLoginWithPhoneStep', 'phoneNumber'),
  withProps(({ onSuccess = noop, hideModal }) => ({
    onSuccess: () => {
      hideModal();
      onSuccess();
    },
  })),
  withStyles(styles),
)(Login);

export default modalFactory({
  content: ConnectedLogin,
  closeButton: true,
});
