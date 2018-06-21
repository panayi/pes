import React from 'react';
import { MobileScreen, DesktopScreen } from 'react-responsive-redux';
import DesktopTitle from './Desktop/Desktop';
import MobileTitle from './Mobile/Mobile';

const Title = props => {
  const {
    mobileOnly,
    desktopOnly,
    action,
    secondaryAction,
    title,
    closeButton,
    onClose,
  } = props;

  return (
    <React.Fragment>
      {!mobileOnly && (
        <DesktopScreen>
          <DesktopTitle
            title={title}
            action={action}
            closeButton={closeButton}
            onClose={onClose}
          />
        </DesktopScreen>
      )}
      {!desktopOnly && (
        <MobileScreen>
          <MobileTitle
            title={title}
            action={action}
            secondaryAction={secondaryAction}
            onClose={onClose}
          />
        </MobileScreen>
      )}
    </React.Fragment>
  );
};

Title.defaultProps = {
  mobileOnly: false,
  desktopOnly: false,
  closeButton: false,
};

export default Title;
