import React, { Component } from 'react';
import * as R from 'ramda';
import { noop } from 'ramda-adjunct';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import requireUserToCallAction from '@pesposa/client-core/src/hocs/requireUserToCallAction';
import { actions as chatActions } from 'store/chat';
import Form from './Form/Form';

// type Props = {
//   adId: String, // eslint-disable-line react/no-unused-prop-types
//   buyerId: ?String,
//   onSuccess: Function,
//   createMessage: Function,
// };

class SendMessage extends Component {
  static defaultProps = {
    onSuccess: noop,
  };

  getValidationSchema = () =>
    yup.object().shape({
      body: yup.string().required('Message is required'),
    });

  handleSubmit = ({ body }, { resetForm }) => {
    const { adId, buyerId, createMessage, onSuccess } = this.props;
    createMessage(body, adId, buyerId).then(onSuccess);
    // Don't wait for createMessage complete
    resetForm();
  };

  render() {
    return (
      <Formik
        initialValues={{ body: '' }}
        validationSchema={this.getValidationSchema}
        onSubmit={this.handleSubmit}
      >
        {formikProps => <Form {...formikProps} {...this.props} />}
      </Formik>
    );
  }
}

const mapDispatchToProps = {
  createMessage: chatActions.createMessage,
};

export default R.compose(
  connect(null, mapDispatchToProps),
  requireUserToCallAction('createMessage'),
)(SendMessage);
