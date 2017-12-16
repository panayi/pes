/* @flow */
import * as R from 'ramda';
import { actions as formActions } from 'react-redux-form';
import { noop } from 'ramda-adjunct';
import { uidSelector } from 'store/auth/selectors';
import { PENDING_ADS } from 'services/connectData/types';
import { AD_FORM_MODEL_PATH, AD_INITIAL_STATE } from './constants';
import { serializeAd } from './utils';

export const initializeForm = (ad: ?Ad) => (dispatch: Dispatch) => {
  if (R.either(R.isNil, R.isEmpty)(ad)) {
    return;
  }

  const initialState = R.compose(
    R.pick(R.keys(AD_INITIAL_STATE)),
    R.defaultTo({}),
  )(ad);

  dispatch(formActions.load(AD_FORM_MODEL_PATH, initialState));
};

export const savePendingAd = (ad: Ad | {}) => (
  dispatch: Dispatch,
  getState: Function,
  getFirebase: Function,
) => {
  const uid = uidSelector(getState());
  return getFirebase().update(`${PENDING_ADS}/${uid}`, serializeAd(ad));
};

export const createAd = (ad: Ad, onSuccess: ?Function = noop) => (
  dispatch: Dispatch,
  getState: Function,
  getFirebase: Function,
) => {
  const userObj = {
    user: uidSelector(getState()),
  };
  const finalAd = R.compose(serializeAd, R.merge(ad))(userObj);

  return getFirebase()
    .push('/ads', finalAd)
    .then(onSuccess)
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
    .update(`/ads/${adId}`, ad)
    .then(onSave);
