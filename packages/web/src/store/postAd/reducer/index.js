import { combineReducers } from 'redux';
import createReducer from './create';

export default combineReducers({
  create: createReducer,
});
