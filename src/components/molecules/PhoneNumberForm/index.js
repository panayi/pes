/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { Formik } from 'formik';
import { connectData } from 'lib/connectData';
import { models } from 'store/data';
import Form from './Form';

type Props = {
  countryCode: string,
  number: string,
  onSubmit: Function,
  onChange: ?Function,
  countries: ?Object,
  children: React$Node | Function,
};

class PhoneNumberForm extends Component<Props> {
  static defaultProps = {
    countryCode: '',
    number: '',
    countries: {},
  };

  mapValues = values => {
    const { countries } = this.props;
    const { countryCode, number } = values;
    const country = R.prop(countryCode, countries);

    const phoneNumber = isNilOrEmpty(country)
      ? number
      : country.callingCode + number;

    return {
      ...values,
      phoneNumber,
      country,
    };
  };

  handleSubmit = async (values, formikBag) => {
    try {
      await this.handleCallback(this.props.onSubmit, values);
    } catch (error) {
      formikBag.setErrors({
        number: error.message,
      });
    }
    formikBag.setSubmitting(false);
  };

  handleChange = values => {
    this.handleCallback(this.props.onChange, values);
  };

  handleCallback = async (callback, values) => {
    if (callback) {
      const finalValues = this.mapValues(values);
      await callback(finalValues);
    }
  };

  render() {
    const { countryCode, number, children } = this.props;
    const initialValues = { countryCode, number };

    return (
      <div>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={this.handleSubmit}
        >
          {formikProps => (
            <Form {...formikProps} onChange={this.handleChange}>
              {R.is(Function, children) ? children(formikProps) : children}
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapDataToProps = {
  countries: models.countries.allObjects,
};

export default connectData(mapDataToProps)(PhoneNumberForm);
