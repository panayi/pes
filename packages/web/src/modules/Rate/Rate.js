import React from 'react';
import { connect } from 'react-redux';
import { MobileScreen, DesktopScreen } from 'react-responsive-redux';
import { actions as modalActions } from 'store/modals';
import OpenModalOnBounce from 'components/Modal/OpenModalOnBounce/OpenModalOnBounce';
import ReduxModal from 'components/Modal/ReduxModal/ReduxModal';
import RateModal from './RateModal/RateModal';
import MobileTrigger from './MobileTrigger/MobileTrigger';

const COOKIE_NAME = 'pesposa-rate-modal';
const DESKTOP_MIN_TIME_BEFORE_SHOW = 50 * 1000; // 50 seconds
const MOBILE_MIN_TIME_BEFORE_SHOW = 90 * 1000; // 90 seconds

const Rate = () => (
  <React.Fragment>
    <DesktopScreen>
      <OpenModalOnBounce
        modalId="rate"
        cookieName={COOKIE_NAME}
        cookieExpire={2}
        timer={DESKTOP_MIN_TIME_BEFORE_SHOW}
      />
    </DesktopScreen>
    <MobileScreen>
      <MobileTrigger timeout={MOBILE_MIN_TIME_BEFORE_SHOW} />
    </MobileScreen>
    <ReduxModal id="rate" content={RateModal} />
  </React.Fragment>
);

const mapDispatchToProps = {
  openModal: modalActions.openModal,
};

export default connect(null, mapDispatchToProps)(Rate);
