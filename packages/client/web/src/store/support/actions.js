import * as R from 'ramda';
import * as supportMessages from '@pesposa/core/src/client/supportMessages';
import { track } from '@pesposa/client-core/src/services/mixpanel';
import { selectors as authSelectors } from '@pesposa/client-core/src/store/firebase/auth';

export const createSupportMessage = supportMessage => async (
  dispatch,
  getState,
  getFirebase,
) => {
  const uid = authSelectors.uidSelector(getState());
  const finalSupportMessage = R.merge(supportMessage, { uid });

  await supportMessages.create(getFirebase(), finalSupportMessage);
  track('contactSupport', supportMessage);
};
