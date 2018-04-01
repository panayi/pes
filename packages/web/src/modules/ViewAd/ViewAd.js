import React from 'react';
import { XsScreen, XsScreenHidden } from 'react-responsive-redux';
import propSelector from '@pesposa/core/src/utils/propSelector';
import hydrateAd from 'hocs/hydrateAd';
import DesktopViewAd from './DesktopViewAd/DesktopViewAd';
import MobileViewAd from './MobileViewAd/MobileViewAd';

const ViewAd = props => (
  <React.Fragment>
    <XsScreenHidden>
      <DesktopViewAd {...props} />
    </XsScreenHidden>
    <XsScreen component={React.Fragment}>
      <MobileViewAd {...props} />
    </XsScreen>
  </React.Fragment>
);

export default hydrateAd(propSelector('adId'), propSelector('legacy'))(ViewAd);
