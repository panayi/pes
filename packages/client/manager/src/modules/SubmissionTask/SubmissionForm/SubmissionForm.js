import React, { Component } from 'react';
import * as R from 'ramda';
import { noop } from 'ramda-adjunct';
import { Formik } from 'formik';
import * as yup from 'yup';
import Form from './Form/Form';

class SubmissionForm extends Component {
  static getValidationSchema() {
    return yup.object().shape({
      url: yup.string().required(),
      source: yup.string(),
      seller: yup.string().required('Seller is required'),
      location: yup.string().required(),
    });
  }

  getInitialValues() {
    return R.compose(
      R.merge({
        originalId: '',
        url: '',
        source: null,
        seller: null,
        location: null,
      }),
      R.pick(['originalId', 'url', 'source', 'seller', 'location']),
      R.defaultTo({}),
      R.prop('submission'),
    )(this.props);
  }

  render() {
    const { children } = this.props;

    return (
      <Formik
        initialValues={this.getInitialValues()}
        enableReinitialize
        validationSchema={SubmissionForm.getValidationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={noop}
      >
        {formikProps => (
          <React.Fragment>
            {children({
              ...formikProps,
              renderForm: () => <Form {...formikProps} />,
            })}
          </React.Fragment>
        )}
      </Formik>
    );
  }
}

export default SubmissionForm;
