import React from 'react';
import * as R from 'ramda';
import { DesktopScreen, TabletScreen } from 'react-responsive-redux';
import withStyles from 'material-ui/styles/withStyles';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import LinkToViewAd from 'components/LinkToViewAd/LinkToViewAd';

const BASE_HEIGHT = 592;

const styles = theme => ({
  desktopWrap: {
    position: 'absolute',
    top: BASE_HEIGHT / 2,
    bottom: 0,
  },
  desktop: {
    boxShadow: 'none',
  },
  tabletWrap: {
    position: 'absolute',
    bottom: -theme.spacing.unit * 2,
    transform: 'translateY(100%)',
  },
  icon: {
    marginBottom: -1,
  },
  previous: {
    '& $desktopWrap': {
      left: -56,
    },
    '& $desktop': {
      borderRadius: '50% 0 0 50%',
    },
    '& $tabletWrap': {
      left: 0,
    },
    '& $icon': {
      marginRight: theme.spacing.unit / 2,
    },
  },
  next: {
    '& $desktopWrap': {
      right: -56,
    },
    '& $desktop': {
      borderRadius: '0 50% 50% 0',
    },
    '& $tabletWrap': {
      right: 0,
    },
    '& $icon': {
      marginLeft: theme.spacing.unit / 2,
    },
  },
});

const BrowseButton = ({ ad, direction, classes }) => {
  const isPrevious = direction === 'previous';
  const Icon = isPrevious ? KeyboardArrowLeft : KeyboardArrowRight;

  return (
    <div className={isPrevious ? classes.previous : classes.next}>
      <DesktopScreen>
        <div className={classes.desktopWrap}>
          <LinkToViewAd
            ad={ad}
            className={classes.desktop}
            disabled={R.isNil(ad)}
            variant="fab"
          >
            <Icon />
          </LinkToViewAd>
        </div>
      </DesktopScreen>
      <TabletScreen>
        <div className={classes.tabletWrap}>
          <LinkToViewAd
            ad={ad}
            className={classes.tablet}
            disabled={R.isNil(ad)}
            variant="raised"
          >
            {isPrevious ? null : 'Next'}
            <Icon className={classes.icon} />
            {isPrevious ? 'Previous' : null}
          </LinkToViewAd>
        </div>
      </TabletScreen>
    </div>
  );
};

export default withStyles(styles)(BrowseButton);
