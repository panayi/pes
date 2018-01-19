import { combineReducers } from 'redux';
import { handleAction } from 'redux-actions';
import { createForms } from 'react-redux-form';
import * as types from './types';
import * as constants from './constants';

const initialState = {
  selectedCategory: null,
  sortBy: null,
  location: null,
  query: {
    value: '',
  },
  price: {
    min: '',
    max: '',
  },
};

const selectedCategoryReducer = handleAction(
  types.SET_SELECTED_CATEGORY,
  (state, { payload }) => payload || initialState.selectedCategory,
  initialState.selectedCategory,
);

const sortByReducer = handleAction(
  types.SET_SORT_BY,
  (state, { payload }) => payload,
  initialState.sortBy,
);

const locationReducer = handleAction(
  types.SET_LOCATION,
  (state, { payload }) => payload,
  initialState.location,
);

export default combineReducers({
  [constants.SELECTED_CATEGORY_KEY]: selectedCategoryReducer,
  [constants.SORT_BY_KEY]: sortByReducer,
  [constants.LOCATION_KEY]: locationReducer,
  ...createForms(
    {
      [constants.QUERY_KEY]: initialState.query,
      [constants.PRICE_KEY]: initialState.price,
    },
    constants.ROOT_KEY,
  ),
});
