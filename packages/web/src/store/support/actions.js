import firebaseApi from 'services/firebase';
import { track } from 'services/mixpanel';

export const createSupportMessage = supportMessage => async dispatch => {
  await dispatch(firebaseApi.supportMessages.create(supportMessage));
  track('contactSupport', supportMessage);
};
