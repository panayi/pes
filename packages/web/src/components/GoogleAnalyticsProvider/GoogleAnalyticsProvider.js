import React from 'react';
import * as R from 'ramda';
import scriptLoader from 'react-async-script-loader';
import env from '@pesposa/core/src/config/env';
import renderNothingWhen from 'hocs/renderNothingWhen';

const { googleAnalyticsTrackingId } = env;

export class GoogleAnalyticsProvider extends React.Component {
  componentDidMount() {
    /* eslint-disable */
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', googleAnalyticsTrackingId);
    /* eslint-enable */
  }

  render() {
    return null;
  }
}

export default R.compose(
  renderNothingWhen(R.complement(R.always(googleAnalyticsTrackingId))),
  scriptLoader(
    `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsTrackingId}`,
  ),
)(GoogleAnalyticsProvider);
