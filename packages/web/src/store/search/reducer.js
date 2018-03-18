import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import hitsReducer, { constants as hitsConstants } from './hits';
import pageReducer, { constants as pageConstants } from './page';
import paramsReducer, { constants as paramsConstants } from './params';
import requestReducer, { constants as requestConstants } from './request';
import scrollPositionReducer, {
  constants as scrollPositionConstants,
} from './scrollPosition';
import totalHitsReducer, { constants as totalHitsConstants } from './totalHits';
import * as constants from './constants';

const searchReducer = combineReducers({
  [hitsConstants.ROOT_KEY]: hitsReducer,
  [pageConstants.ROOT_KEY]: pageReducer,
  [paramsConstants.ROOT_KEY]: paramsReducer,
  [requestConstants.ROOT_KEY]: requestReducer,
  [scrollPositionConstants.ROOT_KEY]: scrollPositionReducer,
  [totalHitsConstants.ROOT_KEY]: totalHitsReducer,
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
