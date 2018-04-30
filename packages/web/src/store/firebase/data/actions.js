import * as R from 'ramda';
import firebaseApi from 'services/firebase';
import { track } from 'services/mixpanel';
import { selectors as authSelectors } from 'store/firebase/auth';

export const toggleSold = ad => dispatch =>
  dispatch(
    firebaseApi.ads.update(ad.id, {
      sold: !ad.sold,
    }),
  );

export const favoriteAd = adId => async (dispatch, getState) => {
  const uid = authSelectors.uidSelector(getState());

  await dispatch(firebaseApi.favorites.create(uid, adId));
  track('favoriteAd');
};

export const unfavoriteAd = adId => async (dispatch, getState) => {
  const uid = authSelectors.uidSelector(getState());

  await dispatch(firebaseApi.favorites.remove(uid, adId));
  track('unfavoriteAd');
};

export const createRating = ({ stars, body }) => (dispatch, getState) => {
  const finalBody = R.isEmpty(body) ? null : body;
  const uid = authSelectors.uidSelector(getState());

  return dispatch(
    firebaseApi.ratings.create(uid, {
      stars,
      body: finalBody,
    }),
  );
};
