import * as R from 'ramda';

// Maps min container width to number of columns
export const COLUMN_COUNTS = {
  0: 1,
  290: 2,
  500: 3,
  700: 4,
  1000: 5,
  1416: 6,
  1900: 7,
};
export const MIN_WIDTHS = R.compose(
  R.sort(R.flip(R.subtract)),
  R.map(parseInt),
  R.keys,
)(COLUMN_COUNTS);
export const GUTTER = {
  0: 8,
  290: 8,
  500: 10,
  700: 13,
  1000: 18,
  1416: 18,
  1900: 18,
};
export const CARD_CONTENT_HEIGHT = 86;
export const THUMBNAIL_WIDTH = 250;
export const DEFAULT_THUMBNAIL_HEIGHT = 250;
export const DEFAULT_CARD_HEIGHT = 450;
export const PAID_AD_VERTICAL_PADDING = 8;
export const SCROLL_OFFSET_FETCH_TRIGGER = 300;
export const IMGIX_PARAMS = {
  auto: 'compress,format',
  w: THUMBNAIL_WIDTH,
  bg: '#F9CDAD',
};
