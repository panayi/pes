import * as R from 'ramda';
import { createSelector } from 'reselect';
import theme from 'config/theme';
import * as constants from './constants';

export const isPhoneSelector = R.path(constants.PHONE_PATH);
export const isTabletSelector = R.path(constants.TABLET_PATH);
export const isDesktopSelector = R.path(constants.DESKTOP_PATH);
export const fakeWidthSelector = R.path(constants.FAKE_WIDTH_PATH);

const breakpointsValues = R.values(theme.breakpoints.values);

const isWithin = (value, lower, upper) => value >= lower && value < upper;

export const widthMismatchSelector = createSelector(
  fakeWidthSelector,
  fakeWidth => {
    const actualWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    let mismatch = true;

    R.addIndex(R.forEach)(
      (breakpoint, index) => {
        const previousBreakpoint = breakpointsValues[index - 1] || 0;
        if (
          isWithin(fakeWidth, previousBreakpoint, breakpoint) &&
          isWithin(actualWidth, previousBreakpoint, breakpoint)
        ) {
          mismatch = false;
        }
      },
      [...breakpointsValues, Number.MAX_SAFE_INTEGER],
    );

    return mismatch;
  },
);
