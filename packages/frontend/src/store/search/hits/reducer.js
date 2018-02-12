import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import { algolia as algoliaConfig } from 'pesposa-config';
import * as pageTypes from '../page/types';
import * as searchTypes from '../types';

const initialState = {};

const hitsReducer = handleActions(
  {
    [searchTypes.SEARCH_REQUEST_SUCCEEDED]: (state, { payload }) =>
      R.compose(
        R.merge(state),
        R.converge(R.zipObj, [R.pluck(algoliaConfig.ID), R.identity]),
        R.propOr([], 'hits'),
      )(payload),

    [pageTypes.RESET_PAGE]: R.always(initialState),
  },
  initialState,
);

export default hitsReducer;
