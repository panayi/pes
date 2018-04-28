/* @flow */
import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { Formik } from 'formik';
import {
  selectors as paramsSelectors,
  actions as paramsActions,
} from 'store/search/params';
import connectSearch from 'hocs/connectSearch';
import Form from './Form/Form';

type Props = {
  inHome: boolean,
  query: string,
  setQuery: Function,
  classes: Object,
};

class Query extends Component<Props> {
  static defaultProps = {
    inHome: false,
  };

  handleSubmit = values => {
    this.props.setQuery(values.query);
  };

  render() {
    const { query, inHome, resetQuery, hasValue } = this.props;

    return (
      <Formik
        initialValues={{ query }}
        onSubmit={this.handleSubmit}
        enableReinitialize
      >
        {formikProps => (
          <Form
            {...formikProps}
            inHome={inHome}
            handleClear={() => resetQuery()}
            hasValue={hasValue}
          />
        )}
      </Formik>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  query: paramsSelectors.querySelector,
  hasValue: paramsSelectors.queryHasValueSelector,
});

const mapDispatchToProps = {
  setQuery: paramsActions.setQuery,
  resetQuery: paramsActions.resetQuery,
};

export default connectSearch(mapStateToProps, mapDispatchToProps)(Query);
