import random from 'lodash.random';
import { createAction } from 'redux-actions';
import { getStateWithSearch } from '../utils';
import * as constants from '../constants';
import * as selectors from './selectors';
import * as types from './types';

const addPaidAdAction = createAction(types.ADD_PAID_AD);

export const addPaidAd = page => (
  dispatch,
  getState,
  globalDispatch,
  searchId,
) => {
  const state = getStateWithSearch(searchId, getState);
  const paidAdsCollection = selectors.paidAdsCollectionSelector(state);
  const paidAd = paidAdsCollection[random(0, paidAdsCollection.length - 1)];

  if (!paidAd) {
    return;
  }

  const position =
    page * constants.HITS_PER_PAGE + random(0, constants.HITS_PER_PAGE - 1);
  dispatch(
    addPaidAdAction({
      ad: paidAd,
      position,
    }),
  );
};
