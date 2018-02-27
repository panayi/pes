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
      : 0;
  },
)(hitIdSelector);

// hitHeightSelector :: { hit, columnWidth } => Number
const hitHeightSelector = R.compose(
  thumbnailHeight =>
    Math.ceil(
      thumbnailHeight +
        constants.CARD_HEADER_HEIGHT +
        constants.CARD_CONTENT_HEIGHT,
    ),
  thumbnailHeightSelector,
);

export const hitSizeAndPositionSelector = createSelector(
  indexSelector,
  hitsSelector,
  columnHeightsSelector,
  columnCountSelector,
  columnWidthSelector,
  (index, hits, columnHeights, columnCount, columnWidth) => {
    const hit = hits[index];
    const column = index % (columnCount || 1);
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
