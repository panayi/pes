import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { handleActions } from 'redux-actions';
import * as pageTypes from '../page/types';
import * as types from './types';

const initialState = [];

const paidAdsReducer = handleActions(
  {
    [types.ADD_PAID_AD]: (state, { payload }) =>
      isNilOrEmpty(payload) ? state : R.append(payload, state),
    [pageTypes.RESET_PAGE]: R.always(initialState),
  },
  initialState,
);

export default paidAdsReducer;
