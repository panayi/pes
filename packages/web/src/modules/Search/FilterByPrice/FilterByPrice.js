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

  renderContent = () => {
    const { minPrice, maxPrice } = this.props;

    return (
      <Formik
        initialValues={{ min: minPrice, max: maxPrice }}
        onSubmit={this.handleSubmit}
        enableReinitialize
      >
        {formikProps => <Form {...formikProps} />}
      </Formik>
    );
  };

  render() {
    const { hasValue, resetPrice, children } = this.props;

    return children({
      render: this.renderContent,
      hasValue,
      reset: resetPrice,
    });
  }
}

const mapStateToProps = createStructuredSelector({
  minPrice: paramsSelectors.minPriceSelector,
  maxPrice: paramsSelectors.maxPriceSelector,
  hasValue: paramsSelectors.priceHasValueSelector,
});

const mapDispatchToProps = {
  setPrice: paramsActions.setPrice,
  resetPrice: paramsActions.resetPrice,
};

export default connectSearch(mapStateToProps, mapDispatchToProps)(
  FilterByPrice,
);
