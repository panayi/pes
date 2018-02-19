import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import categoryReducer, { constants as categoryConstants } from './category';
import hitsReducer, { constants as hitsConstants } from './hits';
import locationReducer, { constants as locationConstants } from './location';
import pageReducer, { constants as pageConstants } from './page';
import priceReducer, { constants as priceConstants } from './price';
import queryReducer, { constants as queryConstants } from './query';
import requestReducer, { constants as requestConstants } from './request';
import sortByReducer, { constants as sortByConstants } from './sortBy';
import totalHitsReducer, { constants as totalHitsConstants } from './totalHits';
import rawParamsReducer, { constants as rawParamsConstants } from './rawParams';
import scrollPositionReducer, {
  constants as scrollPositionConstants,
} from './scrollPosition';
import * as constants from './constants';

const searchReducer = combineReducers({
  [categoryConstants.ROOT_KEY]: categoryReducer,
  [hitsConstants.ROOT_KEY]: hitsReducer,
  [locationConstants.ROOT_KEY]: locationReducer,
  [pageConstants.ROOT_KEY]: pageReducer,
  [requestConstants.ROOT_KEY]: requestReducer,
  [sortByConstants.ROOT_KEY]: sortByReducer,
  [totalHitsConstants.ROOT_KEY]: totalHitsReducer,
  [queryConstants.ROOT_KEY]: queryReducer,
  [priceConstants.ROOT_KEY]: priceReducer,
  [rawParamsConstants.ROOT_KEY]: rawParamsReducer,
  [scrollPositionConstants.ROOT_KEY]: scrollPositionReducer,
});

const searchReducers = {
  home: combineReducers({
    [constants.ROOT_KEY]: multireducer(searchReducer, constants.HOME_SEARCH_ID),
  }),
  profile: combineReducers({
    [constants.ROOT_KEY]: multireducer(
      searchReducer,
      constants.PROFILE_SEARCH_ID,
    ),
  }),
};

export default searchReducers;
