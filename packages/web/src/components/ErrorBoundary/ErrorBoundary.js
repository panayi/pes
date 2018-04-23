import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withState } from 'recompose';
import * as pesposaConfig from '@pesposa/core/src/config/pesposa';
import ErrorPage from 'components/ErrorPage/ErrorPage';

export class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  componentDidCatch() {
    this.props.setErrored(true);
  }

  render() {
    const { errored, children } = this.props;

    if (errored) {
      return (
        <ErrorPage
          title="Something went terribly wrong"
          body="Please contact Pesposa support for assistance."
        >
          {({ PrimaryButton, SecondaryButton }) => (
            <React.Fragment>
              <SecondaryButton
                href={`mailto:${
                  pesposaConfig.SUPPORT_EMAIL_ADDRESS
                }?subject=Support Request`}
              >
                Contact Support
              </SecondaryButton>
              <PrimaryButton onClick={() => window.location.reload()}>
                Reload Pesposa
              </PrimaryButton>
            </React.Fragment>
          )}
        </ErrorPage>
      );
    }

    return children;
  }
}

export default R.compose(withState('errored', 'setErrored', false))(
  ErrorBoundary,
);
