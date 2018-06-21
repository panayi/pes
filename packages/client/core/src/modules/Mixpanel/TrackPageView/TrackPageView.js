import React from 'react';
import * as R from 'ramda';
import { withRouter } from 'react-router-dom';
import { track } from '../../../services/mixpanel';

class TrackGlobalEvents extends React.Component {
  componentDidMount() {
    this.setupTrackPageView();
    const location = R.path(['history', 'location'], this.props);
    this.trackPageView(location);
  }

  setupTrackPageView = () => {
    this.props.history.listen(this.trackPageView);
  };

  trackPageView = location => {
    setTimeout(() => {
      if (location && location.pathname) {
        track('pageView', {
          title: document.title,
          url: location.pathname,
        });
      }
    }, 1000);
  };

  render() {
    return null;
  }
}

export default withRouter(TrackGlobalEvents);
