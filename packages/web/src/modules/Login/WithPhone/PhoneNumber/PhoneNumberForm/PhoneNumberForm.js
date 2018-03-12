/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { withState, withProps } from 'recompose';
import { Formik } from 'formik';
import yup from 'yup';
import * as phoneNumbersConfig from '@pesposa/core/src/config/phoneNumbers';
import { connectData } from 'lib/connectData';
import { models } from 'store/firebase/data';
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
    countries: {},
  };

  getValidationSchema = () => {
    const numberRegex = R.path(['phoneNumberFormat', 'regex'], this.props);

    return yup.object().shape({
      countryCode: yup.string().required('Select a country'),
      number: yup
        .string()
        .ensure()
        .matches(numberRegex, { message: 'Enter a valid number' }),
    });
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
    const { countryCode, number, children, phoneNumberFormat } = this.props;
    const initialValues = { countryCode, number };
    const mask = R.propOr([], 'mask', phoneNumberFormat);

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

const mapDataToProps = {
  countries: models.countries.allObjects,
};

export default R.compose(
  connectData(mapDataToProps),
  withState('selectedCountryCode', 'setSelectedCountryCode', null),
  withProps(({ selectedCountryCode, countryCode }) => ({
    phoneNumberFormat: R.propOr(
      [],
      selectedCountryCode || countryCode,
      phoneNumbersConfig.FORMAT_BY_COUNTRY_CODE,
    ),
  })),
)(PhoneNumberForm);
