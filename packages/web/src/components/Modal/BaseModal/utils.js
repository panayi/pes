export const paddingStyles = (side, theme) => ({
  [`padding${side}`]: `${5 * theme.spacing.unit}px !important`,
  [theme.breakpoints.down('md')]: {
    [`padding${side}`]: `${3 * theme.spacing.unit}px !important`,
  },
});

const hideMobileStyles = (breakpoint, theme) => ({
  display: 'block',
  [theme.breakpoints.down(breakpoint)]: {
    display: 'none',
  },
});

const showMobileStyles = (breakpoint, theme) => ({
  display: 'none',
  [theme.breakpoints.down(breakpoint)]: {
    display: 'block',
  },
});

export const responsiveStyles = theme => ({
  'hideMobile-xs': {
    ...hideMobileStyles('xs', theme),
  },
  'showMobile-xs': {
    ...showMobileStyles('xs', theme),
  },
  'hideMobile-sm': {
    ...hideMobileStyles('sm', theme),
  },
  'showMobile-sm': {
    ...showMobileStyles('sm', theme),
  },
  'hideMobile-md': {
    ...hideMobileStyles('md', theme),
  },
  'showMobile-md': {
    ...showMobileStyles('md', theme),
  },
  'hideMobile-lg': {
    ...hideMobileStyles('lg', theme),
  },
  'showMobile-lg': {
    ...showMobileStyles('lg', theme),
  },
});

export const hideMobileClass = (mobile, classes) =>
  classes[`hideMobile-${mobile}`];
export const hideDesktopClass = (mobile, classes) =>
  classes[`showMobile-${mobile}`];
