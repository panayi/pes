import * as R from 'ramda';
import { combineReducers } from 'redux';
import { createForms } from 'react-redux-form';
import categoryReducer, { constants as categoryConstants } from './category';
import hitsReducer, { constants as hitsConstants } from './hits';
import locationReducer, { constants as locationConstants } from './location';
import pageReducer, { constants as pageConstants } from './page';
import priceForm from './price';
import queryForm from './query';
import sortByReducer, { constants as sortByConstants } from './sortBy';
import * as constants from './constants';

export default combineReducers({
  [categoryConstants.ROOT_KEY]: categoryReducer,
  [hitsConstants.ROOT_KEY]: hitsReducer,
  [locationConstants.ROOT_KEY]: locationReducer,
  [pageConstants.ROOT_KEY]: pageReducer,
  [sortByConstants.ROOT_KEY]: sortByReducer,
  ...createForms(R.merge(priceForm, queryForm), constants.ROOT_KEY),
});
