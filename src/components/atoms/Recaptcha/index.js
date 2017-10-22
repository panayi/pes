import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import generateClassName from 'utils/generateClassName';

export default class Recaptcha extends Component {
  componentDidMount() {
    this.createRecaptcha();
  }

  shouldComponentUpdate() {
    return false;
  }

  RECAPTCHA_ID = generateClassName()

  createRecaptcha() {
    const { RecaptchaVerifier } = this.props.firebase.auth;
    this.verifier = new RecaptchaVerifier(this.RECAPTCHA_ID, {
      size: 'invisible',
    });
  }

  reset() {
    this.verifier.render().then((widgetId) => {
      window.grecaptcha.reset(widgetId);
    });
  }

  render() {
    return (
      <div>
        <Helmet>
          <script src="https://www.google.com/recaptcha/api.js" async defer />
        </Helmet>
        <div id={this.RECAPTCHA_ID} />
      </div>
    );
  }
}
