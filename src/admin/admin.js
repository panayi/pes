import { combineReducers } from 'redux';
import syncReducer from './Sync/sync';

// ------------------------------------
// Reducer
// ------------------------------------

export default combineReducers({
  sync: syncReducer,
});
