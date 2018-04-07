import * as R from 'ramda';
import firebaseApi from 'services/firebase';
import { selectors as authSelectors } from 'store/firebase/auth';

export const toggleSold = ad => dispatch =>
  dispatch(
    firebaseApi.ads.update(ad.id, {
      sold: !ad.sold,
    }),
  );

export const favoriteAd = adId => (dispatch, getState) => {
  const uid = authSelectors.uidSelector(getState());

  return dispatch(firebaseApi.favorites.create(uid, adId));
};

export const unfavoriteAd = adId => (dispatch, getState) => {
  const uid = authSelectors.uidSelector(getState());

  return dispatch(firebaseApi.favorites.remove(uid, adId));
};

export const createRating = ({ stars, body }) => (dispatch, getState) => {
  const finalBody = R.isEmpty(body) ? null : body;
  const uid = authSelectors.uidSelector(getState());

  return dispatch(
    firebaseApi.ratings.create({
      stars,
      body: finalBody,
      user: uid,
    }),
  );
};
