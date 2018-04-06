import * as R from 'ramda';
import getTimestamp from '@pesposa/core/src/utils/getTimestamp';
import * as ads from '@pesposa/core/src/client/ads';
import * as favorites from '@pesposa/core/src/client/favorites';
import * as ratings from '@pesposa/core/src/client/ratings';
import { track } from '../../../services/mixpanel';
import { selectors as authSelectors } from '../../../store/firebase/auth';
import { selectors as userInfoSelectors } from '../../../store/userInfo';

export const toggleSold = ad => (dispatch, getState, getFirebase) =>
  ads.updateProp(getFirebase(), ad.id, 'sold', !ad.sold);

export const favoriteAd = adId => async (dispatch, getState, getFirebase) => {
  const uid = authSelectors.uidSelector(getState());

  await favorites.create(getFirebase(), uid, adId);
  track('favoriteAd');
};

export const unfavoriteAd = adId => async (dispatch, getState, getFirebase) => {
  const uid = authSelectors.uidSelector(getState());

  await favorites.remove(getFirebase(), uid, adId);
  track('unfavoriteAd');
};

export const createRating = ({ stars, body }) => (
  dispatch,
  getState,
  getFirebase,
) => {
  const firebase = getFirebase();
  const finalBody = R.isEmpty(body) ? null : body;
  const state = getState();
  const uid = authSelectors.uidSelector(state);
  const ip = userInfoSelectors.ipSelector(state);
  const userAgent = userInfoSelectors.userAgentSelector(state);

  return ratings.create(firebase, uid, {
    stars,
    body: finalBody,
    ip,
    userAgent,
    currentUrl: window.location.href,
    createdAt: getTimestamp(getFirebase()),
  });
};
