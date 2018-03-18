/* @flow */
import React from 'react';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import withStyles from 'material-ui/styles/withStyles';
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown';
import Imgix from 'components/Imgix/Imgix';
import Button from 'components/Button/Button';
import SmsCodeValidationForm from './SmsCodeValidationForm/SmsCodeValidationForm';

type Props = {
  country: Object,
  phoneNumber: string,
  onSubmit: Function,
  onBackClick: Function,
  classes: Object,
};

const styles = theme => ({
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  flag: {
    marginRight: theme.spacing.unit,
    border: `1px solid ${theme.palette.divider}`,
  },
  helpText: {
    marginTop: 2 * theme.spacing.unit,
  },
  grow: {
    flex: 1,
  },
  formWrapper: {
    marginTop: 4 * theme.spacing.unit,
  },
  submitButton: {
    marginTop: 2 * theme.spacing.unit,
  },
});

export const CodeForm = (props: Props) => {
  const { country, phoneNumber, onSubmit, onBackClick, classes } = props;

  return (
    <div>
      <div className={classes.header}>
        {country && (
          <Imgix
            className={classes.flag}
            image={country.flag}
            params={{ w: 24 }}
          />
        )}
        <Typography className={classes.grow} type="body2">
          {phoneNumber}
        </Typography>
        <IconButton
          onClick={onBackClick}
          title="Enter a different phone number"
          size="small"
        >
          <KeyboardArrowDown />
        </IconButton>
      </div>
      <Typography className={classes.helpText}>
        A text message with a 6-digit verification code was just sent to{' '}
        {phoneNumber}
      </Typography>
      <div className={classes.formWrapper}>
        <SmsCodeValidationForm onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Button
              className={classes.submitButton}
              disabled={isSubmitting}
              variant="raised"
              fullWidth
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          )}
        </SmsCodeValidationForm>
      </div>
    </div>
  );
};

export default withStyles(styles)(CodeForm);
