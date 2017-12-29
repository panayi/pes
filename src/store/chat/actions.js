import * as R from 'ramda';
import { selectors as authSelectors } from 'store/auth';

export const createMessage = (body, ad) => (
  dispatch,
  getState,
  getFirebase,
) => {
  const uid = authSelectors.uidSelector(getState());
  const fromBuyer = !R.equals(uid, ad.user);
  const data = {
    body,
    fromBuyer,
  };

  return getFirebase().push(`/messages/${ad.id}/${uid}/`, data);
};
