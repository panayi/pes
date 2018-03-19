import * as R from 'ramda';
import { createAction } from 'redux-actions';
import * as algoliaService from 'services/algolia';
import * as hitsSelectors from './hits/selectors';
import * as requestSelectors from './request/selectors';
import * as pageSelectors from './page/selectors';
import * as totalHitsSelectors from './totalHits/selectors';
import * as pageActions from './page/actions';
import * as selectors from './selectors';
import * as types from './types';
import { getStateWithSearch } from './utils';

export const requestStarted = createAction(types.SEARCH_REQUEST_STARTED);
export const requestSucceeded = createAction(types.SEARCH_REQUEST_SUCCEEDED);
export const requestFailed = createAction(types.SEARCH_REQUEST_FAILED);

const search = (options = {}) => async (
  dispatch,
  getState,
  globalDispatch,
  searchId,
) => {
  const { firstPage } = options;

  dispatch(requestStarted());

  if (firstPage) {
    dispatch(pageActions.resetPage());
  }

  const state = getStateWithSearch(searchId, getState);
  const indexName = selectors.indexNameSelector(state);
  const params = selectors.searchParamsSelector(state);
  const currentPage = pageSelectors.pageSelector(state);

  const pageToRequest = firstPage ? 0 : currentPage + 1;
  const finalParams = R.merge(params, { page: pageToRequest });

  try {
    const result = await algoliaService.search(indexName, finalParams);
    dispatch(requestSucceeded(result));
    dispatch(pageActions.nextPage());
    return result;
  } catch (error) {
    dispatch(requestFailed(error));
    return null;
  }
};

export const loadFirstPage = () => search({ firstPage: true });

export const loadPage = page => (
  dispatch,
  getState,
  globalDispatch,
  searchId,
) => {
  const state = getStateWithSearch(searchId, getState);
  const isRequestPending = requestSelectors.isRequestPendingSelector(state);

  if (isRequestPending) {
    return null;
  }

  const isFirstPage = page === 0;
  const isHitsEmpty = hitsSelectors.isHitsEmptySelector(state);

  if (isFirstPage && isHitsEmpty) {
    return dispatch(loadFirstPage());
  }

  const currentPage = pageSelectors.pageSelector(state);
  const pagesCount = totalHitsSelectors.pagesCountSelector(state);

  if (!isFirstPage && page > currentPage && page < pagesCount) {
    return dispatch(search());
  }

  return null;
};
