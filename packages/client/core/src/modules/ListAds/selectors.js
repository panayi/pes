import * as R from 'ramda';
import { isPlainObj } from 'ramda-adjunct';
import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import propSelector from '@pesposa/core/src/utils/propSelector';
import id from '@pesposa/core/src/utils/id';
import * as constants from './constants';

const hitsSelector = propSelector('hits');
const hitSelector = propSelector('hit');
const fixedCardHeightSelector = propSelector('fixedCardHeight');
const hitIdSelector = R.compose(
  id,
  hitSelector,
);
const containerWidthSelector = propSelector('containerWidth');
const indexSelector = propSelector('index');
const columnHeightsSelector = propSelector('columnHeights');

const currentMinWidthSelector = createSelector(
  containerWidthSelector,
  containerWidth => R.find(R.gte(containerWidth), constants.MIN_WIDTHS),
);

export const columnCountSelector = createSelector(
  currentMinWidthSelector,
  R.prop(R.__, constants.COLUMN_COUNTS),
);

export const gutterSelector = createSelector(
  currentMinWidthSelector,
  R.prop(R.__, constants.GUTTER),
);

// columnWidthSelector :: { containerWidth } -> Number
export const columnWidthSelector = createSelector(
  containerWidthSelector,
  columnCountSelector,
  gutterSelector,
  (containerWidth, columnCount, gutter) =>
    Math.max(0, (containerWidth + gutter) / columnCount - gutter),
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
      ? Math.ceil((columnWidth / dimensions.width) * dimensions.height)
      : constants.DEFAULT_THUMBNAIL_HEIGHT;
  },
)(hitIdSelector);

// hitHeightSelector :: { hit, columnWidth } => Number
const hitHeightSelector = ({ hit, columnWidth }) => {
  if (hit.isPaidAd) {
    return hit.height + constants.PAID_AD_VERTICAL_PADDING * 2;
  }

  const thumbnailHeight = thumbnailHeightSelector({ hit, columnWidth });
  return Math.ceil(thumbnailHeight + constants.CARD_CONTENT_HEIGHT + 4);
};

export const hitSizeAndPositionSelector = createSelector(
  indexSelector,
  hitsSelector,
  columnHeightsSelector,
  columnCountSelector,
  columnWidthSelector,
  fixedCardHeightSelector,
  gutterSelector,
  (
    index,
    hits,
    columnHeights,
    columnCount,
    columnWidth,
    fixedCardHeight,
    gutter,
  ) => {
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
    const x = column * (gutter + width);
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
