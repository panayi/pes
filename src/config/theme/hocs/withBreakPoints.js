import * as R from 'ramda';
import { createSelector, createStructuredSelector } from 'reselect';
import withSizes from 'react-sizes';
import theme from '../index';
import emToPx from '../helpers/emToPx';

const { breakpoints } = theme;

// ------------------------------------
// Selectors
// ------------------------------------

const currentBreakPointIndexSelector = createSelector(R.prop('width'), width =>
  R.compose(
    R.unless(R.equals(-1), R.subtract(R.length(breakpoints) - 1)),
    R.findIndex(R.compose(R.gte(width), emToPx)),
    R.reverse,
  )(breakpoints),
);

const previousBreakpointSelector = createSelector(
  currentBreakPointIndexSelector,
  R.ifElse(R.equals(-1), R.always(0), R.nth(R.__, breakpoints)),
);

const nextBreakpointSelector = createSelector(
  currentBreakPointIndexSelector,
  R.compose(R.defaultTo(Infinity), R.nth(R.__, breakpoints), R.inc),
);

const intervalSelector = createSelector(
  currentBreakPointIndexSelector,
  R.cond([[R.isNil, R.always(0)], [R.T, R.inc]]),
);

const mapWidthToProps = createStructuredSelector({
  previous: previousBreakpointSelector,
  next: nextBreakpointSelector,
  interval: intervalSelector,
});

export default withSizes(
  R.compose(R.zipObj(['breakpoints']), R.of, mapWidthToProps),
);
