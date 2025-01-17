import React from 'react';
import * as R from 'ramda';
import { noop } from 'ramda-adjunct';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withProps, withState } from 'recompose';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { selectors as loginSelectors } from '../../store/login';
import withSpinnerWhen from '../../hocs/withSpinnerWhen';
import TextDivider from '../../components/TextDivider/TextDivider';
import LoginWithPhone from './WithPhone/WithPhone';
import LoginButtons from './Buttons/Buttons';

// type Props = {
//   onSuccess: Function,
//   phoneOnly: ?boolean,
//   title: ?string,
//   DialogTitle: React$Component<*>,
//   DialogContent: React$Component<*>,
//   loginWithPhoneStep: string,
//   setLoginWithPhoneStep: Function,
//   spinner: React$Element<*>,
//   classes: Object,
// };

const styles = theme => ({
  root: {
    margin: '0 auto',
    [theme.breakpoints.up(theme.map.desktop)]: {
      width: 370,
    },
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
  signUp,
  DialogTitle,
  DialogContent,
  spinner,
  loginWithPhoneStep,
  setLoginWithPhoneStep,
  classes,
}) => {
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
        title={showingSmsCodeValidation ? 'Verify your phone number' : title}
      />
      <DialogContent>
        <div className={classes.root}>
          {spinner}
          <Grid container alignContent="center">
            {!showingSmsCodeValidation &&
              !phoneOnly && (
                <LoginButtons signUp={signUp} onSuccess={onSuccess} />
              )}
            {!disablePhone && (
              <React.Fragment>
                {!phoneOnly &&
                  !showingSmsCodeValidation && (
                    <React.Fragment>
                      <Grid item md={1} />
                      <Grid item xs={12} md={10} className={classes.divider}>
                        <TextDivider variant="subheading" color="textSecondary">
                          or {signUp ? 'sign up' : 'login'} with your phone
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

Login.defaultProps = {
  title: 'Log in to continue',
};

const mapStateToProps = createStructuredSelector({
  isLoginPending: loginSelectors.pendingSelector,
  loginSucceeded: loginSelectors.succeededSelector,
});

const ConnectedLogin = R.compose(
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
