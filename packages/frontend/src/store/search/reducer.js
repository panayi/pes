import { combineReducers } from 'redux';
import categoryReducer, { constants as categoryConstants } from './category';
import hitsReducer, { constants as hitsConstants } from './hits';
import locationReducer, { constants as locationConstants } from './location';
import pageReducer, { constants as pageConstants } from './page';
import priceReducer, { constants as priceConstants } from './price';
import queryReducer, { constants as queryConstants } from './query';
import requestReducer, { constants as requestConstants } from './request';
import sortByReducer, { constants as sortByConstants } from './sortBy';
import totalHitsReducer, { constants as totalHitsConstants } from './totalHits';

export default combineReducers({
  [categoryConstants.ROOT_KEY]: categoryReducer,
  [hitsConstants.ROOT_KEY]: hitsReducer,
  [locationConstants.ROOT_KEY]: locationReducer,
  [pageConstants.ROOT_KEY]: pageReducer,
  [requestConstants.ROOT_KEY]: requestReducer,
  [sortByConstants.ROOT_KEY]: sortByReducer,
  [totalHitsConstants.ROOT_KEY]: totalHitsReducer,
  [queryConstants.ROOT_KEY]: queryReducer,
  [priceConstants.ROOT_KEY]: priceReducer,
});
