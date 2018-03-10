import firebaseApi from 'services/firebase';
import { selectors as authSelectors } from 'store/firebase/auth';

export const markAdAsSold = adId => dispatch =>
  dispatch(
    firebaseApi.ads.update(adId, {
      sold: true,
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
