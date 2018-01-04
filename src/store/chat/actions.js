import * as R from 'ramda';
import api from 'services/api';
import { selectors as authSelectors } from 'store/auth';

export const createMessage = (body, ad) => (dispatch, getState) => {
  const uid = authSelectors.uidSelector(getState());
  const fromBuyer = !R.equals(uid, ad.user);
  const message = {
    body,
    fromBuyer,
  };

  return dispatch(api.messages.create(message, { ad, uid }));
};
