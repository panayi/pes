import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { Formik } from 'formik';
import {
  selectors as priceSelectors,
  actions as priceActions,
} from 'store/search/price';
import connectSearch from 'components/hocs/connectSearch';
import Form from './Form';

class FilterByPrice extends Component {
  handleSubmit = values => {
    this.props.setPrice(values);
  };

  render() {
    const { price } = this.props;

    return (
      <Formik
        initialValues={{ min: price.min, max: price.max }}
        onSubmit={this.handleSubmit}
      >
        {formikProps => <Form {...formikProps} />}
      </Formik>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  price: priceSelectors.priceSelector,
});

const mapDispatchToProps = {
  setPrice: priceActions.setPrice,
};

export default connectSearch(mapStateToProps, mapDispatchToProps)(
  FilterByPrice,
);
