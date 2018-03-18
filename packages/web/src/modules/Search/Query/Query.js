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

class QueryAds extends Component<Props> {
  static defaultProps = {
    inHome: false,
  };

  handleSubmit = values => {
    this.props.setQuery(values.query);
  };

  render() {
    const { query, inHome } = this.props;

    return (
      <Formik initialValues={{ query }} onSubmit={this.handleSubmit}>
        {formikProps => <Form {...formikProps} inHome={inHome} />}
      </Formik>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  query: paramsSelectors.querySelector,
});

const mapDispatchToProps = {
  setQuery: paramsActions.setQuery,
};

export default connectSearch(mapStateToProps, mapDispatchToProps)(QueryAds);
