import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import hitsReducer, { constants as hitsConstants } from './hits';
import pageReducer, { constants as pageConstants } from './page';
import paramsReducer, { constants as paramsConstants } from './params';
import requestReducer, { constants as requestConstants } from './request';
import paidAdsReducer from './paidAds/reducer';
import * as paidAdsConstants from './paidAds/constants';
import scrollPositionReducer, {
  constants as scrollPositionConstants,
} from './scrollPosition';
import pagesCountReducer, {
  constants as pagesCountConstants,
} from './pagesCount';
import * as constants from './constants';

const searchReducer = combineReducers({
  [hitsConstants.ROOT_KEY]: hitsReducer,
  [pageConstants.ROOT_KEY]: pageReducer,
  [paramsConstants.ROOT_KEY]: paramsReducer,
  [requestConstants.ROOT_KEY]: requestReducer,
  [scrollPositionConstants.ROOT_KEY]: scrollPositionReducer,
  [pagesCountConstants.ROOT_KEY]: pagesCountReducer,
  [paidAdsConstants.ROOT_KEY]: paidAdsReducer,
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
  relatedAds: combineReducers({
    [constants.ROOT_KEY]: multireducer(
      searchReducer,
      constants.RELATED_ADS_SEARCH_ID,
    ),
  }),
};

export default searchReducers;
