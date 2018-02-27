import React, { Component } from 'react';
import * as R from 'ramda';
import { withState } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { Formik } from 'formik';
import yup from 'yup';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import DoneIcon from 'material-ui-icons/CheckCircle';
import { actions as supportActions } from 'store/support';
import { selectors as profileSelectors } from 'store/firebase/profile';
import Spinner from 'components/Spinner/Spinner';
import EmptyHero from 'components/EmptyHero/EmptyHero';
import Form from './Form/Form';

const styles = theme => ({
  root: {
    width: 450,
  },
  button: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Support extends Component {
  getValidationSchema = () =>
    yup.object().shape({
      email: yup
        .string()
        .email('Please enter a valid email')
        .required('Email is required'),
      body: yup
        .string()
        .required('Please enter a message')
        .max(400, 'Message should not exceed 400 characters'),
    });

  handleSubmit = async values => {
    this.props.setStatus('pending');
    await this.props.createSupportMessage(values);
    this.props.setStatus('success');
  };

  renderSuccess() {
    const { hideModal, renderContent, renderActions, classes } = this.props;

    return (
      <React.Fragment>
        {renderContent(
          <div className={classes.root}>
            <EmptyHero
              icon={DoneIcon}
              tagline={
                <React.Fragment>
                  <div>Your message was sent!</div>
                  <Typography variant="body2" paragraph>
                    We&apos;ll get back to you soon.
                  </Typography>
                </React.Fragment>
              }
              small
            />
          </div>,
        )}
        {renderActions(<Button onClick={() => hideModal()}>Close</Button>)}
      </React.Fragment>
    );
  }

  render() {
    const { email, renderTitle, renderContent, status, classes } = this.props;
    const initialValues = {
      email,
      subject: '',
      body: '',
    };

    if (status === 'success') {
      return this.renderSuccess();
    }

    return (
      <div className={classes.root}>
        {status === 'pending' && <Spinner overlay centered />}
        {renderTitle(<span>Contact Us</span>)}
        {renderContent(
          <Formik
            initialValues={initialValues}
            onSubmit={this.handleSubmit}
            validationSchema={this.getValidationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize
          >
            {formikProps => (
              <form onSubmit={formikProps.handleSubmit}>
                <Form {...formikProps} />
                <Button
                  className={classes.button}
                  type="submit"
                  fullWidth
                  variant="raised"
                  color="primary"
                >
                  Send
                </Button>
              </form>
            )}
          </Formik>,
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  email: profileSelectors.profileEmailSelector,
});

const mapDispatchToProps = {
  createSupportMessage: supportActions.createSupportMessage,
};

export default R.compose(
  withState('status', 'setStatus', null),
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(Support);
