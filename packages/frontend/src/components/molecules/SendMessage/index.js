/* @flow */
import React, { Component } from 'react';
import { Formik } from 'formik';
import { connectData } from 'lib/connectData';
import { propSelector } from 'pesposa-utils';
import { models } from 'store/firebase/data';
import { actions as chatActions } from 'store/chat';
import Form from './Form';

type Props = {
  adId: String, // eslint-disable-line react/no-unused-prop-types
  ad: Ad,
  createMessage: Function,
};

class SendMessage extends Component<Props> {
  formDispatch: null;

  handleSubmit = ({ body }, { resetForm }) => {
    const { ad, createMessage } = this.props;
    createMessage(body, ad).then(() => resetForm());
  };

  render() {
    return (
      <Formik initialValues={{ body: '' }} onSubmit={this.handleSubmit}>
        {formikProps => <Form {...formikProps} />}
      </Formik>
    );
  }
}

const mapDataToProps = {
  ad: models.ads.one(propSelector('adId')),
};

const mapDispatchToProps = {
  createMessage: chatActions.createMessage,
};

export default connectData(mapDataToProps, null, mapDispatchToProps)(
  SendMessage,
);
