import * as R from 'ramda';
import { createSelector } from 'reselect';
import theme from '../../config/theme';
import * as constants from './constants';

export const isPhoneSelector = R.path(constants.PHONE_PATH);
export const isTabletSelector = R.path(constants.TABLET_PATH);
export const isDesktopSelector = R.path(constants.DESKTOP_PATH);
export const fakeWidthSelector = R.path(constants.FAKE_WIDTH_PATH);

const breakpoints = theme.breakpoints.values;

const getWidthBreakpoint = width =>
  R.converge(R.prop, [
    R.compose(R.find(pair => width >= pair[1]), R.reverse, R.toPairs),
    R.invert,
  ])(breakpoints);

export const fakeWidthBreakpointSelector = createSelector(
  fakeWidthSelector,
  R.compose(
    (name, value) => (name === 'xl' ? breakpoints.lg : value),
    R.when(R.equals('xl'), R.always('lg')),
    getWidthBreakpoint,
  ),
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
