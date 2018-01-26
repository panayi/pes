/* @flow */
import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setDisplayName, withState } from 'recompose';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import ArrowBack from 'material-ui-icons/ArrowBack';
import { factory as modalFactory } from 'store/modals';
import { selectors as profileSelectors } from 'store/firebase/profile';
import withSpinnerWhen from 'components/hocs/withSpinnerWhen';
import LoginWithPhone from 'components/molecules/LoginWithPhone';
import LoginButtons from './LoginButtons';

type Props = {
  hideModal: Function,
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
  hideModal,
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
      )}
    </React.Fragment>
  );
};

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
