import React from 'react';
import { MobileScreen, DesktopScreen } from 'react-responsive-redux';
import CloseButton from '../CloseButton/CloseButton';
import DesktopTitle from './Desktop/Desktop';
import MobileTitle from './Mobile/Mobile';

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
      closeButton,
      onClose,
      children,
    } = this.props;

    return (
      <React.Fragment>
        {!mobileOnly && (
          <DesktopScreen>
            <DesktopTitle
              action={action}
              closeButton={closeButton}
              onClose={onClose}
            >
              {children}
            </DesktopTitle>
          </DesktopScreen>
        )}
        {!desktopOnly && (
          <MobileScreen>
            <MobileTitle
              title={mobileTitle}
              action={action}
              secondaryAction={secondaryAction}
              onClose={onClose}
            >
              {children}
            </MobileTitle>
          </MobileScreen>
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

export default Title;
