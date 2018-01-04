/* @flow */
import * as R from 'ramda';
import { createAction } from 'redux-actions';
import { actions as formActions } from 'react-redux-form';
import debounce from 'lodash.debounce';
import api from 'services/api';
import { uidSelector } from 'store/auth/selectors';
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

  dispatch(formActions.load(formModels.postAd.key, initialState));
};

const updatePendingAd = debounce(
  (ad: Ad | {}, dispatch: Dispatch, getState: Function) => {
    const state = getState();
    const isIdle = isCreateAdIdleSelector(state);

    if (!isIdle) {
      return Promise.reject();
    }

    const uid = uidSelector(getState());

    return dispatch(api.pendingAds.update(uid, serializeAd(ad)));
  },
  200,
);

export const savePendingAd = (ad: Ad | {}) => (...args) =>
  updatePendingAd(ad, ...args);

// Note that pendingAd is also removed by a Firebase function.
// However there's no guarantee when it will be removed.
const removePendingAd = () => (dispatch: Dispatch, getState: Function) => {
  const uid = uidSelector(getState());
  return dispatch(api.pendingAds.remove(uid));
};

export const createAd = (ad: Ad) => (
  dispatch: Dispatch,
  getState: Function,
) => {
  const userObj = {
    user: uidSelector(getState()),
  };
  const finalAd = R.compose(serializeAd, R.merge(ad))(userObj);

  dispatch(createAdPending());

  return dispatch(api.ads.create(finalAd))
    .then(() => dispatch(createAdCompleted()))
    .then(() => dispatch(removePendingAd()))
    .then(() =>
      dispatch(
        formActions.load(formModels.postAd.key, formModels.postAd.initialState),
      ),
    );
};

export const saveAd = (adId: string, onSave: ?Function) => (ad: Ad) => (
  dispatch: Dispatch,
) => dispatch(api.ads.update(serializeAd(ad))).then(onSave);
