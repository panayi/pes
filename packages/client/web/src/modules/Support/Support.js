import React, { Component } from 'react';
import * as R from 'ramda';
import { withState } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { Formik } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import DoneIcon from '@material-ui/icons/CheckCircle';
import { selectors as profileSelectors } from '@pesposa/client-core/src/store/firebase/profile';
import Button from '@pesposa/client-core/src/components/Button/Button';
import Spinner from '@pesposa/client-core/src/components/Spinner/Spinner';
import EmptyHero from '@pesposa/client-core/src/components/EmptyHero/EmptyHero';
import { actions as supportActions } from 'store/support';
import Form from './Form/Form';

const styles = theme => ({
  root: {
    all: 'inherit',
    boxShadow: 'none',
    margin: 0,
    [theme.breakpoints.up(theme.map.tablet)]: {
      minWidth: 530,
    },
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
    const { setStatus, createSupportMessage } = this.props;
    setStatus('pending');
    await createSupportMessage(values);
    setStatus('success');
  };

  renderSuccess() {
    const { DialogTitle, DialogContent, classes } = this.props;

    return (
      <React.Fragment>
        <DialogTitle />
        <DialogContent>
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
          </div>
        </DialogContent>
      </React.Fragment>
    );
  }

  render() {
    const {
      email,
      DialogTitle,
      DialogContent,
      DialogActions,
      status,
      closeModal,
      classes,
    } = this.props;
    const initialValues = {
      email,
      subject: '',
      body: '',
    };

    if (status === 'success') {
      return this.renderSuccess();
    }

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        validationSchema={this.getValidationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize
      >
        {formikProps => (
          <form className={classes.root} onSubmit={formikProps.handleSubmit}>
            {status === 'pending' && <Spinner overlay centered />}
            <DialogTitle title="Contact Us" />
            <DialogContent className={classes.content}>
              <Form {...formikProps} />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => closeModal()}>Cancel</Button>
              <Button type="submit" variant="raised" color="primary">
                Send
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
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
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles),
)(Support);
