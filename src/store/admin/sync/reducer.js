import * as R from 'ramda';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as types from './types';
import * as constants from './constants';

const initialState = {
  status: constants.STATUS_IDLE,
  posts: {},
  images: {},
};

const statusReducer = handleActions({
  [types.RESET]: R.always(initialState.status),
  [types.SYNC_STARTED]: R.always(constants.STATUS_STARTED),
  [types.SYNC_SUCCEEDED]: R.always(constants.STATUS_SUCCEEDED),
  [types.SYNC_FAILED]: R.always(constants.STATUS_FAILED),
}, initialState.status);

const postsReducer = handleActions({
  [types.RESET]: R.always(initialState.posts),
  [types.POST_SYNC_SUCCESS]: (state, { payload }) => R.assoc(payload.id, payload, state),
}, initialState.posts);

const imagesReducer = handleActions({
  [types.RESET]: R.always(initialState.images),
  [types.IMAGE_SYNC_SUCCESS]: (state, { payload }) => R.assoc(
    payload.id,
    (state[payload.id] || 0) + 1,
    state,
  ),
}, initialState.images);

export default combineReducers({
  status: statusReducer,
  posts: postsReducer,
  images: imagesReducer,
});
