/* @flow */
import * as R from 'ramda';
import { createAction } from 'redux-actions';
import { actions as formActions } from 'react-redux-form';
import debounce from 'lodash.debounce';
import { uidSelector } from 'store/auth/selectors';
import { modelTypes } from 'store/data';
import * as types from './types';
import { AD_FORM_MODEL_PATH, AD_INITIAL_STATE } from './constants';
import { serializeAd } from './utils';
import { isCreateAdIdleSelector } from './selectors';

export const createAdPending = createAction(types.AD_CREATE_PENDING);
export const createAdCompleted = createAction(types.AD_CREATE_COMPLETED);
export const createAdReset = createAction(types.AD_CREATE_RESET);

export const initializeForm = (ad: ?Ad) => (dispatch: Dispatch) => {
  const initialState = R.compose(
    R.pick(R.keys(AD_INITIAL_STATE)),
    R.defaultTo({}),
  )(ad);

  dispatch(formActions.load(AD_FORM_MODEL_PATH, initialState));
};

const updatePendingAd = debounce(
  (
    ad: Ad | {},
    dispatch: Dispatch,
    getState: Function,
    getFirebase: Function,
  ) => {
    const state = getState();
    const isIdle = isCreateAdIdleSelector(state);

    if (!isIdle) {
      return Promise.reject();
    }

    const uid = uidSelector(getState());

    return getFirebase().update(
      `${modelTypes.PENDING_ADS}/${uid}`,
      serializeAd(ad),
    );
  },
  200,
);

export const savePendingAd = (ad: Ad | {}) => (...args) =>
  updatePendingAd(ad, ...args);

// Note that pendingAd is also removed by a Firebase function.
// However there's no guarantee when it will be removed.
const removePendingAd = () => (
  dispatch: Dispatch,
  getState: Function,
  getFirebase: Function,
) => {
  const uid = uidSelector(getState());
  return getFirebase().remove(`${modelTypes.PENDING_ADS}/${uid}`);
};

export const createAd = (ad: Ad) => (
  dispatch: Dispatch,
  getState: Function,
  getFirebase: Function,
) => {
  const userObj = {
    user: uidSelector(getState()),
  };
  const finalAd = R.compose(serializeAd, R.merge(ad))(userObj);

  dispatch(createAdPending());

  return getFirebase()
    .push('/ads', finalAd)
    .then(() => dispatch(createAdCompleted()))
    .then(() => dispatch(removePendingAd()))
    .then(() =>
      dispatch(formActions.load(AD_FORM_MODEL_PATH, AD_INITIAL_STATE)),
    );
};

export const saveAd = (adId: string, onSave: ?Function) => (ad: Ad) => (
  dispatch: Dispatch,
  getState: Function,
  getFirebase: Function,
) =>
  getFirebase()
    .update(`/ads/${adId}`, serializeAd(ad))
    .then(onSave);
