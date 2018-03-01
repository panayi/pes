import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { setDisplayName } from 'recompose';
import { DialogTitle } from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import CloseButton from '../CloseButton/CloseButton';
import {
  responsiveStyles,
  hideMobileClass,
  hideDesktopClass,
  paddingStyles,
} from '../utils';

const styles = theme => ({
  desktopTitle: {
    ...paddingStyles('Top', theme),
    ...paddingStyles('Right', theme),
    ...paddingStyles('Left', theme),
  },
  appBar: {
    position: 'relative',
  },
  mobileAction: {
    flex: '0 0 auto',
    minWidth: 48,
  },
  mobileTitle: {
    flex: 1,
    textAlign: 'center',
  },
  onlyActionWrap: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  onlyAction: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  ...responsiveStyles(theme),
});

class Title extends React.Component {
  renderDesktopAction() {
    const { closeButton, action, onClose } = this.props;

    return (
      <React.Fragment>
        {action}
        {closeButton && !action ? <CloseButton onClose={onClose} /> : null}
      </React.Fragment>
    );
  }

  render() {
    const {
      mobileOnly,
      desktopOnly,
      action,
      secondaryAction,
      mobileTitle,
      onClose,
      mobile,
      children,
      classes,
    } = this.props;
    const hideMobile = hideMobileClass(mobile, classes);
    const hideDesktop = hideDesktopClass(mobile, classes);

    return (
      <React.Fragment>
        {!mobileOnly && (
          <div className={hideMobile}>
            {children ? (
              <DialogTitle
                className={classNames(classes.desktopTitle, hideMobile)}
              >
                {this.renderDesktopAction()}
                {children}
              </DialogTitle>
            ) : (
              <div className={classes.onlyActionWrap}>
                <div className={classes.onlyAction}>
                  {this.renderDesktopAction(classes.onlyAction)}
                </div>
              </div>
            )}
          </div>
        )}
        {!desktopOnly && (
          <AppBar className={classNames(classes.appBar, hideDesktop)}>
            <Toolbar disableGutters>
              <div className={classes.mobileAction}>
                {action || <CloseButton onClose={onClose} />}
              </div>
              {children || (
                <div className={classes.mobileTitle}>
                  <Typography variant="title" color="inherit">
                    {mobileTitle}
                  </Typography>
                </div>
              )}
              <div className={classes.mobileAction}>{secondaryAction}</div>
            </Toolbar>
          </AppBar>
        )}
      </React.Fragment>
    );
  }
}

Title.defaultProps = {
  mobileOnly: false,
  desktopOnly: false,
  closeButton: false,
};

export default R.compose(setDisplayName('DialogTitle'), withStyles(styles))(
  Title,
);
