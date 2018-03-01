import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { setDisplayName } from 'recompose';
import { DialogContent } from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
import {
  responsiveStyles,
  hideMobileClass,
  hideDesktopClass,
  paddingStyles,
} from '../utils';

const styles = theme => ({
  desktopContent: {
    ...paddingStyles('', theme),
  },
  mobileContent: {
    marginTop: theme.spacing.unit * 2,
  },
  ...responsiveStyles(theme),
});

const Content = ({ mobile, children, className, classes }) => {
  const hideMobile = hideMobileClass(mobile, classes);
  const hideDesktop = hideDesktopClass(mobile, classes);

  return (
    <React.Fragment>
      <DialogContent
        className={classNames(classes.desktopContent, hideMobile, className)}
      >
        {children}
      </DialogContent>
      <DialogContent
        className={classNames(classes.mobileContent, hideDesktop, className)}
      >
        {children}
      </DialogContent>
    </React.Fragment>
  );
};

export default R.compose(setDisplayName('DialogContent'), withStyles(styles))(
  Content,
);
