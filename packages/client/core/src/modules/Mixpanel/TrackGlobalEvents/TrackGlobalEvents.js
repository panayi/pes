import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createSelector, createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import mixpanelService from '../../../services/mixpanel';
import { selectors as authSelectors } from '../../../store/firebase/auth';
import { selectors as userInfoselectors } from '../../../store/userInfo';
import { selectors as profileSelectors } from '../../../store/firebase/profile';

class TrackGlobalEvents extends React.Component {
  componentDidMount() {
    // Identify current user
    this.identify();

    // Track user profile
    this.setProfile();
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

  identify() {
    const { currentUserId, isAuthenticated } = this.props;

    if (isAuthenticated && currentUserId) {
      mixpanelService.identify(currentUserId);
    }
  }

  render() {
    return null;
  }
}

// Mixpanel reference: https://mixpanel.com/help/reference/http#people-special-properties
const mixpanelProfileSelector = createSelector(
  userInfoselectors.countryCodeSelector,
  userInfoselectors.citySelector,
  profileSelectors.profileSelector,
  (countryCode, city, profile) => ({
    country: countryCode,
    city,
    $name: R.path(['profile', 'name'], profile),
    $email: R.prop('email', profile),
    $phone: R.path(['profile', 'phone'], profile),
  }),
);

const mapStateToProps = createStructuredSelector({
  isAuthenticated: authSelectors.isAuthenticatedSelector,
  currentUserId: authSelectors.uidSelector,
  mixpanelProfile: mixpanelProfileSelector,
});

export default R.compose(
  connect(mapStateToProps),
  withRouter,
)(TrackGlobalEvents);
