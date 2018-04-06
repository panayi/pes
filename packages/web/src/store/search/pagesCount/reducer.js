import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import * as pageTypes from '../page/types';
import * as searchTypes from '../types';

const initialState = null;

const pagesCountReducer = handleActions(
  {
    [searchTypes.SEARCH_REQUEST_SUCCEEDED]: (state, { payload }) =>
      R.prop('nbPages', payload),

    [pageTypes.RESET_PAGE]: R.always(initialState),
  },
  initialState,
);

export default pagesCountReducer;
