import React, { Component } from 'react';
import * as R from 'ramda';
import { Helmet } from 'react-helmet';
import generateClassName from '@pesposa/core/src/utils/generateClassName';

// type Props = {
//   firebase: Object,
// };

export default class Recaptcha extends Component {
  RECAPTCHA_ID = generateClassName();

  verifier = null;

  componentDidMount() {
    this.createRecaptcha();
  }

  shouldComponentUpdate() {
    return false;
  }

  reset = () =>
    this.verifier.render().then(widgetId => {
      const reset = R.path(['grecaptcha', 'reset'], window);
      if (reset) {
        reset(widgetId);
      }
    });

  createRecaptcha() {
    const { firebase } = this.props;
    const { RecaptchaVerifier } = firebase.auth;
    this.verifier = new RecaptchaVerifier(this.RECAPTCHA_ID, {
      size: 'invisible',
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
