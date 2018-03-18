import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { Formik } from 'formik';
import {
  selectors as paramsSelectors,
  actions as paramsActions,
} from 'store/search/params';
import connectSearch from 'hocs/connectSearch';
import Form from './Form/Form';

class FilterByPrice extends Component {
  handleSubmit = values => {
    this.props.setPrice(values);
  };

  render() {
    const { minPrice, maxPrice } = this.props;

    return (
      <Formik
        initialValues={{ min: minPrice, max: maxPrice }}
        onSubmit={this.handleSubmit}
      >
        {formikProps => <Form {...formikProps} />}
      </Formik>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  minPrice: paramsSelectors.minPriceSelector,
  maxPrice: paramsSelectors.maxPriceSelector,
});

const mapDispatchToProps = {
  setPrice: paramsActions.setPrice,
};

export default connectSearch(mapStateToProps, mapDispatchToProps)(
  FilterByPrice,
);
