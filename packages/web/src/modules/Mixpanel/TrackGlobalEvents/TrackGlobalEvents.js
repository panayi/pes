import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { withRouter } from 'react-router-dom';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import mixpanelService, { track } from 'services/mixpanel';

class TrackGlobalEvents extends React.Component {
  componentDidMount() {
    // Identify current user
    this.identify();

    // Track user profile
    this.setProfile();

    // Track page view
    this.setupTrackPageView();
    const location = R.path(['history', 'location'], this.props);
    this.trackPageView(location);
  }

  componentDidUpdate(prevProps) {
    if (
      propsChanged(['currentUserId', 'isAuthenticated'], this.props, prevProps)
    ) {
      this.identify();
    }
    if (
      propsChanged(
        ['mixpanelProfile', 'isAuthenticated'],
        this.props,
        prevProps,
      )
    ) {
      this.setProfile();
    }
  }

  setProfile() {
    const { mixpanelProfile, isAuthenticated } = this.props;
    if (isAuthenticated && !isNilOrEmpty(mixpanelProfile)) {
      mixpanelService.people.set(mixpanelProfile);
    }
  }

  setupTrackPageView = () => {
    this.props.history.listen(this.trackPageView);
  };

  identify() {
    const { currentUserId, isAuthenticated } = this.props;

    if (isAuthenticated && currentUserId) {
      mixpanelService.identify(currentUserId);
    }
  }

  trackPageView = location => {
    if (location && location.pathname) {
      track('pageView', {
        title: document.title,
        url: location.pathname,
      });
    }
  };

  render() {
    return null;
  }
}

export default R.compose(withRouter)(TrackGlobalEvents);
