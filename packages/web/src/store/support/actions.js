import * as R from 'ramda';
import firebaseApi from 'services/firebase';
import { track } from 'services/mixpanel';
import { selectors as authSelectors } from 'store/firebase/auth';

export const createSupportMessage = supportMessage => async (
  dispatch,
  getState,
) => {
  const uid = authSelectors.uidSelector(getState());
  const finalSupportMessage = R.merge(supportMessage, { uid });

  await dispatch(firebaseApi.supportMessages.create(finalSupportMessage));
  track('contactSupport', supportMessage);
};
