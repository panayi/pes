import * as functions from 'firebase-functions';
import mixpanelEvents from '@pesposa/core/src/config/mixpanelEvents';
import * as mixpanelService from '@pesposa/core/src/services/mixpanel';

const handleSignup = async user => mixpanelService.track(mixpanelEvents.signUp, user);

export const signedUp = functions.auth.user().onCreate(handleSignup);
