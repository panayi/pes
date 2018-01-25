/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { Formik } from 'formik';
import Form from './Form';

type Props = {
  onSubmit: Function,
  children: React$Node | Function,
};

const INITIAL_VALUES = {
  code: '',
};

class SmsCodeValidationForm extends Component<Props> {
  handleSubmit = (values, formikBag) => {
    try {
      this.props.onSubmit(values);
    } catch (error) {
      formikBag.setErrors({
        code: error,
      });
    }
  };

  render() {
    const { children } = this.props;

    return (
      <Formik initialValues={INITIAL_VALUES} onSubmit={this.handleSubmit}>
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
