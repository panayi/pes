/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { Helmet } from 'react-helmet';
import generateClassName from 'utils/generateClassName';

type Props = {
  firebase: Object,
};

export default class Recaptcha extends Component<Props> {
  componentDidMount() {
    this.createRecaptcha();
  }

  shouldComponentUpdate() {
    return false;
  }

  RECAPTCHA_ID = generateClassName();

  createRecaptcha() {
    const { RecaptchaVerifier } = this.props.firebase.auth;
    this.verifier = new RecaptchaVerifier(this.RECAPTCHA_ID, {
      size: 'invisible',
    });
  }

  reset = () =>
    this.verifier.render().then(widgetId => {
      const reset = R.path(['grecaptcha', 'reset'], window);
      if (reset) {
        reset(widgetId);
      }
    });

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
