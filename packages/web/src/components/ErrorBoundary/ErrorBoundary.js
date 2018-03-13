import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withState } from 'recompose';
import { fade } from 'material-ui/styles/colorManipulator';
import * as pesposaConfig from '@pesposa/core/src/config/pesposa';
import theme from 'config/theme';

const rootStyles = {
  margin: '14vh auto 0',
  padding: '32px 0 24px 0',
  maxWidth: '600px',
  width: '100%',
  boxSizing: 'borderBox',
  textAlign: 'center',
  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
  background: fade(theme.palette.primary.light, 0.4),
};

const buttonStyles = styles => ({
  display: 'inline-block',
  minHeight: 38,
  background: 'white',
  color: 'black',
  textDecoration: 'none',
  padding: '10px 24px',
  margin: 8,
  border: 0,
  borderRadius: 4,
  fontSize: '15px',
  fontWeight: 400,
  fontFamily: 'Arial',
  cursor: 'pointer',
  ...styles,
});

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

  renderError = () => (
    <div style={rootStyles}>
      <h2 variant="title" style={{ marginTop: 0 }}>
        Something went terribly wrong.
      </h2>
      <p style={{ marginBottom: 32 }}>
        Please contact Pesposa support for assistance.
      </p>
      <div>
        <a
          href={`mailto:${
            pesposaConfig.SUPPORT_EMAIL_ADDRESS
          }?subject=Support Request`}
          style={buttonStyles()}
        >
          Contact Support
        </a>
        <button
          onClick={() => window.location.reload()}
          style={buttonStyles({
            background: theme.palette.primary.main,
            color: 'white',
          })}
        >
          Reload Pesposa
        </button>
      </div>
    </div>
  );

  render() {
    const { errored, children } = this.props;

    if (errored) {
      return this.renderError();
    }

    return children;
  }
}

export default R.compose(withState('errored', 'setErrored', false))(
  ErrorBoundary,
);
