import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import env from '@pesposa/core/src/config/env';
import mixpanelEvents from '@pesposa/core/src/config/mixpanelEvents';
import mixpanelService from '@pesposa/core/src/services/mixpanel';

const handleSignup = async user => {
  if (!user.email) {
    return null;
  }

  // Set admin for internal users
  const emailDomain = user.email.replace(/.*@/, '');
  if (emailDomain === env.internalEmailDomain) {
    const claims = {
      admin: true,
    };
    // Set custom user claims on this newly created user.
    await admin.auth().setCustomUserClaims(user.uid, claims);
  }

  // TODO: Dirty way to tell whether user is anonymous
  if (!user.email && !user.phone) {
    return null;
  }

  return mixpanelService.track(mixpanelEvents.signUp, {
    user: user.email,
    name: user.name,
    phone: user.phone,
  });
};

const signedUp = functions.auth.user().onCreate(handleSignup);

export default signedUp;
