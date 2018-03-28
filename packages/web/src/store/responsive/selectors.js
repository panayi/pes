import * as R from 'ramda';
import * as constants from './constants';

export const isPhoneSelector = R.path(constants.PHONE_PATH);
export const isTabletSelector = R.path(constants.TABLET_PATH);
export const isDesktopSelector = R.path(constants.DESKTOP_PATH);
export const fakeWidthSelector = R.path(constants.FAKE_WIDTH_PATH);
