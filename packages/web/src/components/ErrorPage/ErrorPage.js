import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fade } from 'material-ui/styles/colorManipulator';
import theme from 'config/theme';
import Logo from 'components/Logo/Logo';

const rootStyles = {
  margin: '0 auto',
  maxWidth: '600px',
  width: '100%',
  boxSizing: 'border-box',
};

const logoWrapStyles = {
  height: 100,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '32px 0',
  boxSizing: 'border-box',
};

const logoStyles = {
  height: '100%',
  boxSizing: 'border-box',
};

const boxStyles = {
  padding: '32px 0 32px 0',
  boxSizing: 'border-box',
  textAlign: 'center',
  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
  background: fade(theme.palette.primary.light, 0.4),
};

const buttonWrapStyles = {
  display: 'inline-block',
  margin: 8,
  boxSizing: 'border-box',
};

const buttonStyles = styles => ({
  minHeight: 38,
  background: 'white',
  color: 'black',
  textDecoration: 'none',
  padding: '10px 24px',
  border: 0,
  borderRadius: 4,
  fontSize: '15px',
  fontWeight: 400,
  fontFamily: 'Arial',
  cursor: 'pointer',
  boxSizing: 'border-box',
  ...styles,
});

export class ErrorPage extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  renderButton = (primary, props) => {
    const { children, ...rest } = props;
    const style = primary
      ? buttonStyles({
          background: theme.palette.secondary.main,
          color: 'white',
        })
      : buttonStyles();

    return (
      <div style={buttonWrapStyles}>
        <a {...rest} style={style}>
          {children}
        </a>
      </div>
    );
  };

  render() {
    const { title, body, children } = this.props;

    return (
      <div style={rootStyles}>
        <div style={logoWrapStyles}>
          <Logo style={logoStyles} />
        </div>
        <div style={boxStyles}>
          {title ? (
            <h2 variant="title" style={{ marginTop: 0 }}>
              {title}
            </h2>
          ) : null}
          {body ? <p style={{ marginBottom: 32 }}>{body}</p> : null}
          <div>
            {children({
              PrimaryButton: props => this.renderButton(true, props),
              SecondaryButton: props => this.renderButton(false, props),
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorPage;
