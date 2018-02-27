/* @flow */
import * as R from 'ramda';
import { createAction } from 'redux-actions';
import debounce from 'lodash.debounce';
import firebaseApi from 'services/firebase';
import { selectors as authSelectors } from 'store/firebase/auth';
import * as types from './types';
import { serializeAd } from './utils';
import { isCreateAdIdleSelector } from './selectors';

export const createAdPending = createAction(types.AD_CREATE_PENDING);
export const createAdCompleted = createAction(types.AD_CREATE_COMPLETED);
export const createAdReset = createAction(types.AD_CREATE_RESET);

const DEBOUNCE_TIMEOUT = 200; // ms

const updateDraft = debounce(
  (ad: Ad | {}, dispatch: Dispatch, getState: Function) => {
    const state = getState();
    const isIdle = isCreateAdIdleSelector(state);

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
  const userObj = {
    user: authSelectors.uidSelector(getState()),
  };
  const finalAd = R.compose(serializeAd, R.merge(ad))(userObj);

  dispatch(createAdPending());

  return dispatch(firebaseApi.pendingReviewAds.create(finalAd))
    .then(() => dispatch(createAdCompleted()))
    .then(() => dispatch(removeDraft()));
};

export const saveAd = (adId: string, ad: Ad) => (dispatch: Dispatch) =>
  dispatch(firebaseApi.ads.update(adId, serializeAd(ad)));
