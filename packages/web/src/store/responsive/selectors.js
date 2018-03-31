import * as R from 'ramda';
import { createSelector } from 'reselect';
import theme from 'config/theme';
import * as constants from './constants';

export const isPhoneSelector = R.path(constants.PHONE_PATH);
export const isTabletSelector = R.path(constants.TABLET_PATH);
export const isDesktopSelector = R.path(constants.DESKTOP_PATH);
export const fakeWidthSelector = R.path(constants.FAKE_WIDTH_PATH);

const breakpoints = theme.breakpoints.values;

const getWidthBreakpoint = width =>
  R.compose(
    R.head,
    R.find(([name, value]) => width >= value), // eslint-disable-line no-unused-vars
    R.reverse,
    R.toPairs,
  )(breakpoints);

export const fakeWidthBreakpointSelector = createSelector(
  fakeWidthSelector,
  getWidthBreakpoint,
);

export const actualWidthBreakpointSelector = () => {
  const actualWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  return getWidthBreakpoint(actualWidth);
};

export const widthMismatchSelector = createSelector(
  fakeWidthBreakpointSelector,
  actualWidthBreakpointSelector,
  R.complement(R.equals),
);
