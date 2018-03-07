import React from 'react';
import { MobileScreen, DesktopScreen } from 'react-responsive-redux';
import propSelector from '@pesposa/core/src/utils/propSelector';
import hydrateAd from 'hocs/hydrateAd';
import DesktopViewAd from './DesktopViewAd/DesktopViewAd';
import MobileViewAd from './MobileViewAd/MobileViewAd';

const ViewAd = (props) => {
  return (
    <React.Fragment>
      <DesktopScreen>
        <DesktopViewAd {...props} />
      </DesktopScreen>
      <MobileScreen>
        <MobileViewAd {...props} />
      </MobileScreen>
    </React.Fragment>
  )
};

export default hydrateAd(propSelector('adId'), propSelector('legacy'))(ViewAd);
