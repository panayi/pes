import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { withState } from 'recompose';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import mixpanelBrowser from 'mixpanel-browser';
import env from '@pesposa/core/src/config/env';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import { selectors as authSelectors } from 'store/firebase/auth';
import { selectors as userInfoselectors } from 'store/userInfo';
import { selectors as profileSelectors } from 'store/firebase/profile';

export const MixpanelContext = React.createContext();

class MixpanelProvider extends React.Component {
  componentDidMount() {
    mixpanelBrowser.init(env.mixpanelToken, {
      loaded: this.handleMixpanelLoaded,
    });
  }

  componentDidUpdate(prevProps) {
    if (
      propsChanged(
        ['currentUserId', 'isAuthenticated', 'mixpanel'],
        this.props,
        prevProps,
      )
    ) {
      this.identify();
    }
    if (
      propsChanged(
        ['mixpanelProfile', 'isAuthenticated', 'mixpanel'],
        this.props,
        prevProps,
      )
    ) {
      this.setProfile();
    }
  }

  setProfile() {
    const { mixpanelProfile, isAuthenticated, mixpanel } = this.props;
    if (mixpanel && isAuthenticated && !isNilOrEmpty(mixpanelProfile)) {
      mixpanel.people.set(mixpanelProfile);
    }
  }

  handleMixpanelLoaded = instance => {
    this.props.setMixpanel(instance);
    this.identify();
    this.setProfile();
  };

  identify() {
    const { currentUserId, isAuthenticated, mixpanel } = this.props;

    if (mixpanel && isAuthenticated && currentUserId) {
      mixpanel.identify(currentUserId);
    }
  }

  render() {
    const { mixpanel, children } = this.props;

    return (
      <MixpanelContext.Provider value={mixpanel}>
        {children}
      </MixpanelContext.Provider>
    );
  }
}

// Mixpanel reference: https://mixpanel.com/help/reference/http#people-special-properties
const mixpanelProfileSelector = createSelector(
  userInfoselectors.actualLocationSelector,
  profileSelectors.profileSelector,
  (location, profile) => ({
    country: R.path(['address', 'country'], location),
    city: R.path(['address', 'city'], location),
    $name: R.path(['profile', 'displayName'], profile),
    $email: R.prop('email', profile),
    $phone: R.path(['profile', 'phoneNumber'], profile),
  }),
);

const mapStateToProps = createStructuredSelector({
  isAuthenticated: authSelectors.isAuthenticatedSelector,
  currentUserId: authSelectors.uidSelector,
  mixpanelProfile: mixpanelProfileSelector,
});

export default R.compose(
  connect(mapStateToProps),
  withState('mixpanel', 'setMixpanel', null),
)(MixpanelProvider);
