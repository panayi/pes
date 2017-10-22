import * as R from 'ramda';
import { createSelector } from 'reselect';
import * as constants from './constants';

const SYNC_PATH = ['admin', 'sync'];

const statusSelector = R.path([...SYNC_PATH, 'status']);

const isStatusEqualTo = value => createSelector(
  statusSelector,
  R.equals(value),
);

export const isStatusIdleSelector = isStatusEqualTo(constants.STATUS_IDLE);

export const isStatusSucceededSelector = isStatusEqualTo(constants.STATUS_SUCCEEDED);

const syncedImageSelector = R.path([...SYNC_PATH, 'images']);

const syncedPostsSelector = R.path([...SYNC_PATH, 'posts']);

export const postsSelector = createSelector(
  syncedPostsSelector,
  syncedImageSelector,
  R.useWith(R.merge, [
    R.identity,
    R.map(count => ({ syncedImagesCount: count })),
  ]),
);
