/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { actions as chatActions } from 'store/chat';
import Form from './Form/Form';

type Props = {
  adId: String, // eslint-disable-line react/no-unused-prop-types
  buyerId: String,
  createMessage: Function,
};

class SendMessage extends Component<Props> {
  formDispatch: null;

  handleSubmit = ({ body }, { resetForm }) => {
    const { adId, buyerId, createMessage } = this.props;
    createMessage(body, adId, buyerId).then(() => resetForm());
  };

  render() {
    return (
      <Formik initialValues={{ body: '' }} onSubmit={this.handleSubmit}>
        {formikProps => <Form {...formikProps} {...this.props} />}
      </Formik>
    );
  }
}

const mapDispatchToProps = {
  createMessage: chatActions.createMessage,
};

export default connect(null, mapDispatchToProps)(SendMessage);
