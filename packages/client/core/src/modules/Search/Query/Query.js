import React, { Component } from 'react';
import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { Formik } from 'formik';
import {
  selectors as paramsSelectors,
  actions as paramsActions,
} from '../../../store/search/params';
import connectSearch from '../../../hocs/connectSearch';
import TrackOnCall from '../../Mixpanel/TrackOnCall/TrackOnCall';
import Form from './Form/Form';

// type Props = {
//   inHome: boolean,
//   query: string,
//   setQuery: Function,
//   classes: Object,
// };

class Query extends Component {
  static defaultProps = {
    inHome: false,
  };

  handleSubmit = values => {
    const { setQuery } = this.props;
    setQuery(values.query);
  };

  render() {
    const { query, inHome, resetQuery, hasValue } = this.props;

    return (
      <TrackOnCall>
        {({ track }) => (
          <Formik
            initialValues={{ query }}
            onSubmit={track(
              this.handleSubmit,
              'search',
              R.compose(
                R.assoc('query', R.__, {}),
                R.prop('query'),
              ),
            )}
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
        )}
      </TrackOnCall>
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
