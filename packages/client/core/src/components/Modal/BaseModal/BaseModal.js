import React from 'react';
import * as R from 'ramda';
import { noop } from 'ramda-adjunct';
import { defaultProps } from 'recompose';
import { MobileScreen, DesktopScreen } from 'react-responsive-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from './Title/Title';
import DialogContent from './Content/Content';
import DialogActions from './Actions/Actions';

class BaseModal extends React.Component {
  componentWillUnmount() {
    this.onExitMobile();
  }

  onEnterMobile = () => {
    document.body.style.overflow = 'hidden';
    document.body.style.width = '100%';
    document.body.style.position = 'fixed';
  };

  onExitMobile = () => {
    // Restore styles
    document.body.style.overflow = '';
    document.body.style.width = '';
    document.body.style.position = '';
  };

  render() {
    const {
      content: Content,
      onClose,
      dialogTitle,
      contentProps,
      ...rest
    } = this.props;

    const finalContentProps = {
      ...contentProps,
      DialogTitle: dialogTitle || DialogTitle,
      DialogContent,
      DialogActions,
    };

    return (
      <React.Fragment>
        <DesktopScreen>
          <Dialog onClose={onClose} {...rest}>
            <Content {...finalContentProps} />
          </Dialog>
        </DesktopScreen>
        <MobileScreen>
          <Dialog
            onClose={onClose}
            onEnter={this.onEnterMobile}
            onExit={this.onExitMobile}
            {...rest}
            fullScreen
          >
            <Content {...finalContentProps} />
          </Dialog>
        </MobileScreen>
      </React.Fragment>
    );
  }
}

export default R.compose(
  defaultProps({
    onClose: noop,
    disableEscapeKeyDown: true,
  }),
)(BaseModal);
