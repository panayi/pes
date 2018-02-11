/* @flow */
import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import {
  selectors as querySelectors,
  actions as queryActions,
} from 'store/search/query';
import Form from './Form';

type Props = {
  query: string,
  setQuery: Function,
  classes: Object,
};

class QueryAds extends Component<Props> {
  handleSubmit = values => {
    this.props.setQuery(values.query);
  };

  render() {
    const { query } = this.props;

    return (
      <Formik initialValues={{ query }} onSubmit={this.handleSubmit}>
        {formikProps => <Form {...formikProps} />}
      </Formik>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  query: querySelectors.querySelector,
});

const mapDispatchToProps = {
  setQuery: queryActions.setQuery,
};

export default connect(mapStateToProps, mapDispatchToProps)(QueryAds);
