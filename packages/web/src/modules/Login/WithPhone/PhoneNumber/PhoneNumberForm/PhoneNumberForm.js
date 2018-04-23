/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { withState, withProps } from 'recompose';
import { Formik } from 'formik';
import yup from 'yup';
import * as phoneNumbersConfig from '@pesposa/core/src/config/phoneNumbers';
import GeneralErrorMessage from 'components/GeneralErrorMessage/GeneralErrorMessage';
import Form from './Form/Form';

type Props = {
  countryCode: string,
  number: string,
  onSubmit: Function,
  onChange: ?Function,
  countries: ?Object,
  children: React$Node | Function,
  phoneNumberFormat: {
    mask: Array<RegExp | string>,
    regex: RegExp,
  } | null,
  selectedCountryCode: string,
  setSelectedCountryCode: Function,
};

class PhoneNumberForm extends Component<Props> {
  static defaultProps = {
    countryCode: '',
    number: '',
  };

  getValidationSchema = () => {
    const numberRegex = R.path(['phoneConfig', 'regex'], this.props);

    return yup.object().shape({
      countryCode: yup.string().required('Select a country'),
      number: yup
        .string()
        .ensure()
        .matches(numberRegex, { message: 'Enter a valid number' }),
    });
  };

  mapValues = values => {
    const { number } = values;
    const callingCode = R.path(['phoneConfig', 'callingCode'], this.props);

    const phoneNumber = isNilOrEmpty(callingCode)
      ? number
      : callingCode + number;

    return {
      ...values,
      phoneNumber,
    };
  };

  handleSubmit = async (values, formikBag) => {
    try {
      await this.handleCallback(this.props.onSubmit, values);
    } catch (error) {
      console.log(error);
      formikBag.setErrors({
        number: <GeneralErrorMessage />,
      });
    }
    formikBag.setSubmitting(false);
  };

  handleChange = values => {
    this.props.setSelectedCountryCode(values.countryCode);
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
    const mask = R.pathOr([], ['phoneConfig', 'mask'], this.props);

    return (
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={this.handleSubmit}
        validationSchema={this.getValidationSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {formikProps => (
          <Form {...formikProps} mask={mask} onChange={this.handleChange}>
            {R.is(Function, children) ? children(formikProps) : children}
          </Form>
        )}
      </Formik>
    );
  }
}

export default R.compose(
  withState('selectedCountryCode', 'setSelectedCountryCode', null),
  withProps(({ selectedCountryCode, countryCode }) => ({
    phoneConfig: R.pathOr(
      {},
      [selectedCountryCode || countryCode],
      phoneNumbersConfig.BY_COUNTRY,
    ),
  })),
)(PhoneNumberForm);
