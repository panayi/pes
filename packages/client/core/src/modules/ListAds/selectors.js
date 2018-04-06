import * as R from 'ramda';
import { isPlainObj } from 'ramda-adjunct';
import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import propSelector from '@pesposa/core/src/utils/propSelector';
import id from '@pesposa/core/src/utils/id';
import * as constants from './constants';

const hitsSelector = propSelector('hits');
const hitSelector = propSelector('hit');
const sizeSelector = propSelector('size');
const fixedCardHeightSelector = propSelector('fixedCardHeight');
const hitIdSelector = R.compose(id, hitSelector);
const containerWidthSelector = propSelector('containerWidth');
const indexSelector = propSelector('index');
const columnHeightsSelector = propSelector('columnHeights');

const currentMinWidthSelector = createSelector(
  containerWidthSelector,
  sizeSelector,
  (containerWidth, size) =>
    R.find(R.gte(containerWidth), constants.MIN_WIDTHS(size)),
);

export const columnCountSelector = createSelector(
  sizeSelector,
  currentMinWidthSelector,
  R.compose(R.path(R.__, constants.COLUMN_COUNTS), R.unapply(R.identity)),
);

// columnWidthSelector :: { containerWidth } -> Number
export const columnWidthSelector = createSelector(
  containerWidthSelector,
  columnCountSelector,
  (containerWidth, columnCount) =>
    Math.max(
      0,
      (containerWidth + constants.GUTTER) / columnCount - constants.GUTTER,
    ),
);

// thumbnailSelector :: { hit } -> Thumbnail
//  Thumbnail = { url, height, dimensions }
export const thumbnailSelector = createCachedSelector(
  hitSelector,
  propSelector(['thumbnail']),
)(hitIdSelector);

export const thumbnailHeightSelector = createCachedSelector(
  fixedCardHeightSelector,
  thumbnailSelector,
  propSelector('columnWidth'),
  (fixedCardHeight, thumbnail, columnWidth) => {
    if (fixedCardHeight) {
      return fixedCardHeight - constants.CARD_CONTENT_HEIGHT;
    }

    const dimensions = R.prop('dimensions', thumbnail);
    return isPlainObj(dimensions)
      ? columnWidth / dimensions.width * dimensions.height
      : constants.DEFAULT_THUMBNAIL_HEIGHT;
  },
)(hitIdSelector);

// hitHeightSelector :: { hit, columnWidth } => Number
const hitHeightSelector = ({ hit, columnWidth }) => {
  if (hit.isPaidAd) {
    return hit.height + constants.PAID_AD_VERTICAL_PADDING * 2;
  }

  const thumbnailHeight = thumbnailHeightSelector({ hit, columnWidth });
  return Math.ceil(thumbnailHeight + constants.CARD_CONTENT_HEIGHT);
};

export const hitSizeAndPositionSelector = createSelector(
  indexSelector,
  hitsSelector,
  columnHeightsSelector,
  columnCountSelector,
  columnWidthSelector,
  fixedCardHeightSelector,
  (index, hits, columnHeights, columnCount, columnWidth, fixedCardHeight) => {
    const hit = hits[index];
    const minColumnHeight = R.reduce(
      R.min,
      Number.POSITIVE_INFINITY,
      columnHeights,
    );
    const column = R.findIndex(R.equals(minColumnHeight), columnHeights);
    const height =
      fixedCardHeight ||
      (hit && hitHeightSelector({ hit, columnWidth })) ||
      constants.DEFAULT_CARD_HEIGHT;
    const width = columnWidth;
    const x = column * (constants.GUTTER + width);
    const y = columnHeights[column] || 0;

    return {
      column,
      height,
      width,
      x,
      y,
    };
  },
);
