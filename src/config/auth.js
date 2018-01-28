import { PROVIDER_IDS } from 'constants/firebase';

export default {
  providers: [PROVIDER_IDS.facebook, PROVIDER_IDS.google, PROVIDER_IDS.phone],
  [PROVIDER_IDS.facebook]: {
    type: 'popup',
    scopes: ['public_profile', 'email', 'user_friends'],
  },
  [PROVIDER_IDS.google]: {
    type: 'popup',
    scopes: ['profile', 'email'],
  },
  [PROVIDER_IDS.phone]: {
    type: 'popup',
    scopes: [],
  },
};
