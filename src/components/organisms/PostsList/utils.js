import * as R from 'ramda';
import { createSelector } from 'reselect';

// ------------------------------------
// Constants
// ------------------------------------
// const { breakpoints } = theme;
//
// export const SIZES = [
//   { columns: 1, gutter: 20 },
//   { columns: 2, gutter: 20, mq: emToPx(breakpoints[0]) + 'px' },
//   { columns: 2, gutter: 20, mq: emToPx(breakpoints[1]) + 'px' },
//   { columns: 3, gutter: 20, mq: emToPx(breakpoints[2]) + 'px' },
//   { columns: 4, gutter: 20, mq: emToPx(breakpoints[3]) + 'px' },
//   { columns: 5, gutter: 20, mq: emToPx(breakpoints[4]) + 'px' },
// ];

// ------------------------------------
// Helpers
// ------------------------------------

// calculateNumberOfColumns :: (TotalWidth, ColumnWidth) -> Positive Integer
//   TotalWidth = Integer
//   ColumnWidth = Integer
const calculateNumberOfColumns = (columnWidth, gutter, availableWidth) => {
  let numberOfColumns = 0;

  while (
    R.lte(numberOfColumns * (columnWidth + gutter), availableWidth + gutter)
  ) {
    numberOfColumns += 1;
  }

  return numberOfColumns <= 0 ? 1 : numberOfColumns - 1;
};

// ------------------------------------
// Selectors
// ------------------------------------

// sizesSelector ::
//   ({ columnWidth: Number, wastedWidth: Number, maxScreenWidth: Number, gutter: Number })
//   -> [Size]
//   Size = { columns: Number, mq: String, gutter: Number }
//   All numbers in px
export const sizesSelector = createSelector(
  R.prop('columnWidth'),
  R.prop('wastedWidth'),
  R.prop('maxScreenWidth'),
  R.prop('gutter'),
  (columnWidth, wastedWidth, maxScreenWidth, gutter) =>
    R.compose(
      sizes =>
        R.prepend(
          {
            columns: sizes[0].columns,
            gutter,
          },
          sizes,
        ),
      R.reduce((acc, item) => {
        const lastItem = R.last(acc);
        if (lastItem && R.equals(item.columns, lastItem.columns)) {
          return acc;
        }

        return R.append(
          {
            columns: item.columns,
            mq: `${item.screenWidth}px`,
            gutter,
          },
          acc,
        );
      }, []),
      R.map(screenWidth => ({
        screenWidth,
        columns: calculateNumberOfColumns(
          columnWidth,
          gutter,
          screenWidth - wastedWidth,
        ),
      })),
      R.range(0),
    )(maxScreenWidth),
);
