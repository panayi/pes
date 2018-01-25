/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withFirebase } from 'react-redux-firebase';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { selectors as profileSelectors } from 'store/profile';
import Recaptcha from 'components/atoms/Recaptcha';
import PhoneNumberForm from 'components/molecules/PhoneNumberForm';

type Props = {
  countryCode: ?string,
  onSubmit: Function,
  hidden: boolean,
  firebase: Object,
  classes: Object,
};

const styles = theme => ({
  submitButton: {
    marginTop: 2 * theme.spacing.unit,
  },
  hidden: {
    display: 'none',
  },
});

class PhoneNumber extends Component<Props> {
  recaptcha: ?Object;

  render() {
    const { countryCode, onSubmit, hidden, firebase, classes } = this.props;

    return (
      <div className={classNames({ [classes.hidden]: hidden })}>
        <PhoneNumberForm
          countryCode={countryCode}
          onSubmit={values => onSubmit(values, this.recaptcha)}
        >
          {({ isSubmitting }) => (
            <Button
              className={classes.submitButton}
              disabled={isSubmitting}
              raised
              fullWidth
              color="primary"
              type="submit"
            >
              Send validation code
            </Button>
          )}
        </PhoneNumberForm>
        <Recaptcha
          firebase={firebase}
          ref={instance => {
            this.recaptcha = instance;
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  countryCode: profileSelectors.profileCountryCodeSelector,
});

export default R.compose(
  connect(mapStateToProps),
  withFirebase,
  withStyles(styles),
)(PhoneNumber);
