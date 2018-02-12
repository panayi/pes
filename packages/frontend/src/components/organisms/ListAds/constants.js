import * as R from 'ramda';

// Maps min container width to number of columns
export const COLUMN_COUNTS = {
  0: 1,
  350: 2,
  500: 3,
  700: 4,
  1000: 5,
  1416: 6,
  1900: 7,
};
export const MIN_WIDTHS = R.compose(R.sort(R.lt), R.map(parseInt), R.keys)(
  COLUMN_COUNTS,
);
export const GUTTER = 10;
export const CARD_HEADER_HEIGHT = 60;
export const CARD_CONTENT_HEIGHT = 40;
export const THUMBNAIL_WIDTH = 250;
export const DEFAULT_CARD_HEIGHT = 450;
export const SCROLL_OFFSET_FETCH_TRIGGER = 300;
export const IMGIX_PARAMS = {
  auto: 'compress,format',
  w: THUMBNAIL_WIDTH,
};
