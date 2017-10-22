import { combineReducers } from 'redux';
import syncReducer from './sync';

export default combineReducers({
  sync: syncReducer,
});
