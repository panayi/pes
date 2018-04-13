/* @flow */
import React from 'react';
import * as R from 'ramda';
import { noop } from 'ramda-adjunct';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setDisplayName, withProps, withState } from 'recompose';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import withStyles from 'material-ui/styles/withStyles';
import ArrowBack from 'material-ui-icons/ArrowBack';
import { selectors as loginSelectors } from 'store/login';
import withSpinnerWhen from 'hocs/withSpinnerWhen';
import TextDivider from 'components/TextDivider/TextDivider';
import LoginWithPhone from './WithPhone/WithPhone';
import LoginButtons from './Buttons/Buttons';

type Props = {
  onSuccess: Function,
  phoneOnly: ?boolean,
  title: ?string,
  DialogTitle: React$Component<*>,
  DialogContent: React$Component<*>,
  loginWithPhoneStep: string,
  setLoginWithPhoneStep: Function,
  spinner: React$Element<*>,
  classes: Object,
};

const styles = theme => ({
  root: {
    width: 370,
    margin: '0 auto',
  },
  divider: {
    marginTop: theme.spacing.unit * 3.5,
    marginBottom: theme.spacing.unit * 5,
  },
});

const Login = ({
  onSuccess,
  phoneOnly,
  disablePhone,
  title,
  DialogTitle,
  DialogContent,
  spinner,
  loginWithPhoneStep,
  setLoginWithPhoneStep,
  classes,
}: Props) => {
  const showingSmsCodeValidation = loginWithPhoneStep === 'smsCodeValidation';

  return (
    <React.Fragment>
      <DialogTitle
        closeButton
        action={
          showingSmsCodeValidation && (
            <IconButton
              onClick={() => setLoginWithPhoneStep('phoneNumber')}
              color="inherit"
            >
              <ArrowBack />
            </IconButton>
          )
        }
        title={
          showingSmsCodeValidation
            ? 'Verify your phone number'
            : title || 'Log in to continue'
        }
      />
      <DialogContent>
        <div className={classes.root}>
          {spinner}
          <Grid container alignContent="center">
            {!showingSmsCodeValidation &&
              !phoneOnly && <LoginButtons onSuccess={onSuccess} />}
            {!disablePhone && (
              <React.Fragment>
                {!phoneOnly && (
                  <React.Fragment>
                    <Grid item xs={1} />
                    <Grid item xs={10} className={classes.divider}>
                      <TextDivider variant="subheading" color="textSecondary">
                        or login with your phone
                      </TextDivider>
                    </Grid>
                  </React.Fragment>
                )}
                <Grid item xs={12}>
                  <LoginWithPhone
                    onSuccess={onSuccess}
                    step={loginWithPhoneStep}
                    onStepChange={setLoginWithPhoneStep}
                  />
                </Grid>
              </React.Fragment>
            )}
          </Grid>
        </div>
      </DialogContent>
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
  withSpinnerWhen(R.prop('isLoginPending'), {
    centered: true,
    overlay: true,
  }),
  withState('loginWithPhoneStep', 'setLoginWithPhoneStep', 'phoneNumber'),
  withProps(({ onSuccess = noop, closeModal }) => ({
    onSuccess: () => {
      closeModal();
      onSuccess();
    },
  })),
  withStyles(styles),
)(Login);

export default ConnectedLogin;
