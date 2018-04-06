import { combineReducers } from 'redux';
import changesReducer, { constants as changesConstants } from './changes';
import createAdReducer, { constants as createAdConstants } from './createAd';

export default combineReducers({
  [changesConstants.ROOT_KEY]: changesReducer,
  [createAdConstants.ROOT_KEY]: createAdReducer,
});
