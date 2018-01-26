/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { Formik } from 'formik';
import yup from 'yup';
import Form from './Form';

type Props = {
  onSubmit: Function,
  children: React$Node | Function,
};

const INITIAL_VALUES = {
  code: '',
};

const validationSchema = yup.object().shape({
  code: yup
    .string()
    .ensure()
    .matches(/^\d{6}$/, {
      message: 'Wrong number of digits (should be 6 digits)',
    }),
});

class SmsCodeValidationForm extends Component<Props> {
  handleSubmit = async (values, formikBag) => {
    try {
      await this.props.onSubmit(values);
    } catch (error) {
      const message =
        error.code === 'auth/invalid-verification-code'
          ? 'Wrong code. Try again.'
          : 'Something went wrong. Try again.';

      formikBag.setErrors({
        code: message,
      });
    }
    formikBag.setSubmitting(false);
  };

  render() {
    const { children } = this.props;

    return (
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={this.handleSubmit}
        validationSchema={validationSchema}
        validateOnChange={false}
      >
        {formikProps => (
          <Form {...formikProps}>
            {R.is(Function, children) ? children(formikProps) : children}
          </Form>
        )}
      </Formik>
    );
  }
}

export default SmsCodeValidationForm;
