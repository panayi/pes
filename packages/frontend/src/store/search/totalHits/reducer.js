import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import * as pageTypes from '../page/types';
import * as searchTypes from '../types';

const initialState = null;

const totalHitsReducer = handleActions(
  {
    [searchTypes.SEARCH_REQUEST_SUCCEEDED]: (state, { payload }) =>
      R.prop('nbHits', payload),

    [pageTypes.RESET_PAGE]: R.always(initialState),
  },
  initialState,
);

export default totalHitsReducer;
