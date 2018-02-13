/* @flow */
import * as R from 'ramda';
import { createAction } from 'redux-actions';
import { actions as formActions } from 'react-redux-form';
import debounce from 'lodash.debounce';
import api from 'services/api';
import { selectors as authSelectors } from 'store/firebase/auth';
import * as types from './types';
import { models as formModels } from '../forms';
import { serializeAd } from './utils';
import { isCreateAdIdleSelector } from './selectors';

export const createAdPending = createAction(types.AD_CREATE_PENDING);
export const createAdCompleted = createAction(types.AD_CREATE_COMPLETED);
export const createAdReset = createAction(types.AD_CREATE_RESET);

export const initializeForm = (ad: ?Ad) => (dispatch: Dispatch) => {
  const initialState = R.compose(
    R.pick(R.keys(formModels.postAd.initialState)),
    R.defaultTo({}),
  )(ad);

  dispatch(formActions.load(formModels.postAd.path, initialState));
};

const DEBOUNCE_TIMEOUT = 200; // ms

const updateDraft = debounce(
  (ad: Ad | {}, dispatch: Dispatch, getState: Function) => {
    const state = getState();
    const isIdle = isCreateAdIdleSelector(state);

    if (!isIdle) {
      return Promise.reject();
    }

    const uid = authSelectors.uidSelector(getState());

    return dispatch(api.draftAd.update(uid, serializeAd(ad)));
  },
  DEBOUNCE_TIMEOUT,
);

export const saveDraft = (ad: Ad | {}) => (...args) => updateDraft(ad, ...args);

// Note that draftAd is also removed by a Firebase function.
// However there's no guarantee when it will be removed.
const removeDraft = () => (dispatch: Dispatch, getState: Function) => {
  const uid = authSelectors.uidSelector(getState());
  return dispatch(api.draftAd.remove(uid));
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

  return dispatch(api.pendingReviewAds.create(finalAd))
    .then(() => dispatch(createAdCompleted()))
    .then(() => dispatch(removeDraft()))
    .then(() =>
      dispatch(
        formActions.load(formModels.postAd.key, formModels.postAd.initialState),
      ),
    );
};

export const saveAd = (adId: string, onSave: ?Function) => (ad: Ad) => (
  dispatch: Dispatch,
) => dispatch(api.ads.update(adId, serializeAd(ad))).then(onSave);
