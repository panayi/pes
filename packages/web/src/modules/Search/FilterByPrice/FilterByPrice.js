import React, { Component } from 'react';
import * as R from 'ramda';
import debounce from 'lodash.debounce';
import { createStructuredSelector } from 'reselect';
import { Formik } from 'formik';
import {
  selectors as paramsSelectors,
  actions as paramsActions,
} from 'store/search/params';
import connectSearch from 'hocs/connectSearch';
import TrackOnCall from 'modules/Mixpanel/TrackOnCall/TrackOnCall';
import Form from './Form/Form';

const SUBMIT_TIMEOUT = 300;

class FilterByPrice extends Component {
  handleSubmit = values => {
    this.props.setPrice(values);
  };

  renderContent = () => {
    const { minPrice, maxPrice } = this.props;

    return (
      <TrackOnCall>
        {({ track }) => (
          <Formik
            initialValues={{ min: minPrice, max: maxPrice }}
            onSubmit={debounce(
              track(
                this.handleSubmit,
                'filterAdsByPrice',
                R.pick(['min', 'max']),
              ),
              SUBMIT_TIMEOUT,
            )}
            enableReinitialize
          >
            {formikProps => <Form {...formikProps} />}
          </Formik>
        )}
      </TrackOnCall>
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
