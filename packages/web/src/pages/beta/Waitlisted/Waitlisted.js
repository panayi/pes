import React from 'react';
import * as R from 'ramda';
import scriptLoader from 'react-async-script-loader';

export class WaitListed extends React.Component {
  componentDidMount() {
    this.setup();
  }

  componentDidUpdate() {
    this.setup();
  }

  setup() {
    if (this.props.isScriptLoadSucceed && !this.setupCompleted) {
      this.setupCompleted = true;
      window.waitlisted.start({ domain: 'pesposa.app.waitlisted.co' });
    }
  }

  render() {
    return null;
  }
}

export default R.compose(
  scriptLoader('https://waitlisted.co/assets/v2/embed.js'),
)(WaitListed);
