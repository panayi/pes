import * as R from 'ramda';
import api from 'services/api';
import { selectors as authSelectors } from 'store/firebase/auth';

export const createMessage = (body, adId, buyerId) => (dispatch, getState) => {
  const uid = authSelectors.uidSelector(getState());
  const fromBuyer = R.equals(uid, buyerId);
  const data = {
    body,
    fromBuyer,
  };

  return dispatch(api.messages.create(data, adId, buyerId));
};
