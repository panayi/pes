/* @flow */
import * as R from 'ramda';
import { createAction } from 'redux-actions';
import debounce from 'lodash.debounce';
import firebaseApi from 'services/firebase';
import { selectors as authSelectors } from 'store/firebase/auth';
import { selectors as userInfoSelectors } from 'store/userInfo';
import * as types from './types';
import * as selectors from './selectors';
import * as constants from './constants';
import { serializeAd } from './utils';

export const createAdPending = createAction(types.AD_CREATE_PENDING);
export const createAdFailed = createAction(types.AD_CREATE_FAILED);
export const createAdCompleted = createAction(types.AD_CREATE_COMPLETED);
export const createAdReset = createAction(types.AD_CREATE_RESET);

const DEBOUNCE_TIMEOUT = 200; // ms

const updateDraft = debounce(
  (ad: Ad | {}, dispatch: Dispatch, getState: Function) => {
    const state = getState();
    const isIdle = selectors.isCreateAdIdleSelector(state);

    if (!isIdle) {
      return Promise.reject();
    }

    const uid = authSelectors.uidSelector(getState());

    return dispatch(firebaseApi.draftAd.update(uid, serializeAd(ad)));
  },
  DEBOUNCE_TIMEOUT,
);

export const saveDraft = (ad: Ad | {}) => (...args) => updateDraft(ad, ...args);

// Note that draftAd is also removed by a Firebase function.
// However there's no guarantee when it will be removed.
const removeDraft = () => (dispatch: Dispatch, getState: Function) => {
  const uid = authSelectors.uidSelector(getState());
  return dispatch(firebaseApi.draftAd.remove(uid));
};

export const createAd = (ad: Ad) => (
  dispatch: Dispatch,
  getState: Function,
) => {
  const state = getState();
  const isInSameCountry = userInfoSelectors.isInSameCountrySelector(state);

  if (!isInSameCountry) {
    return dispatch(createAdFailed(constants.USER_NOT_IN_SAME_COUNTRY_ERROR));
  }

  const additionalData = {
    user: authSelectors.uidSelector(state),
    location: selectors.newAdLocationSelector(state),
  };
  const finalAd = R.compose(serializeAd, R.merge(ad))(additionalData);

  dispatch(createAdPending());

  return dispatch(firebaseApi.pendingReviewAds.create(finalAd))
    .then(() => dispatch(createAdCompleted()))
    .then(() => dispatch(removeDraft()));
};

export const saveAd = (adId: string, ad: Ad) => (dispatch: Dispatch) => {
  const serializedAd = serializeAd(ad);
  const finalAd = R.omit(['images'], serializedAd);
  return dispatch(firebaseApi.ads.update(adId, finalAd));
};

export const removeAd = (adId: string) => (dispatch: Dispatch) =>
  dispatch(firebaseApi.ads.remove(adId));
