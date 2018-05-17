import * as R from 'ramda';
import { isPlainObj } from 'ramda-adjunct';
import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import propSelector from '@pesposa/core/src/utils/propSelector';
import id from 'utils/id';
import { selectors as imagesSelectors } from 'store/images';
import * as constants from './constants';

const hitsSelector = propSelector('hits');
const hitSelector = propSelector('hit');
const hitIdSelector = R.compose(id, hitSelector);
const containerWidthSelector = propSelector('containerWidth');
const indexSelector = propSelector('index');
const columnHeightsSelector = propSelector('columnHeights');

const currentMinWidthSelector = createSelector(
  containerWidthSelector,
  containerWidth => R.find(R.gte(containerWidth), constants.MIN_WIDTHS),
);

export const columnCountSelector = R.compose(
  R.prop(R.__, constants.COLUMN_COUNTS),
  currentMinWidthSelector,
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
export const thumbnailSelector = createCachedSelector(hitSelector, hit =>
  imagesSelectors.adFirstImageSelector({ ad: hit }),
)(hitIdSelector);

export const thumbnailHeightSelector = createCachedSelector(
  thumbnailSelector,
  propSelector('columnWidth'),
  (thumbnail, columnWidth) => {
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
  (index, hits, columnHeights, columnCount, columnWidth) => {
    const hit = hits[index];
    const minColumnHeight = R.reduce(
      R.min,
      Number.POSITIVE_INFINITY,
      columnHeights,
    );
    const column = R.findIndex(R.equals(minColumnHeight), columnHeights);
    const height = hit
      ? hitHeightSelector({ hit, columnWidth })
      : constants.DEFAULT_CARD_HEIGHT;
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
