import * as functions from 'firebase-functions';
import mixpanelEvents from '@pesposa/core/src/config/mixpanelEvents';
import mixpanelService from '@pesposa/core/src/services/mixpanel';

const handleSignup = async user => {
  // TODO: Dirty way to tell whether user is anonymous
  if (!user.email && !user.phoneNumber) {
    return null;
  }

  return mixpanelService.track(mixpanelEvents.signUp, {
    user: user.email,
    displayName: user.displayName,
    phoneNumber: user.phoneNumber,
  });
};

export const signedUp = functions.auth.user().onCreate(handleSignup);
