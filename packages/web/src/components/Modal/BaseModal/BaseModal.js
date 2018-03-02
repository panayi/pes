// @flow weak
import React from 'react';
import * as R from 'ramda';
import { noop } from 'ramda-adjunct';
import { defaultProps } from 'recompose';
import { MobileScreen, DesktopScreen } from 'react-responsive-redux';
import Dialog from 'material-ui/Dialog';
import DialogTitle from './Title/Title';
import DialogContent from './Content/Content';
import DialogActions from './Actions/Actions';

type Props = {
  content: React$Component<*>,
  dialogTitle: React$Component<*>,
  onClose: Function,
  contentProps: Object,
};

const BaseModal = (props: Props) => {
  const {
    content: Content,
    onClose,
    dialogTitle,
    contentProps,
    ...rest
  } = props;

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
        <Dialog onClose={onClose} {...rest} fullScreen>
          <Content {...finalContentProps} />
        </Dialog>
      </MobileScreen>
    </React.Fragment>
  );
};

export default R.compose(
  defaultProps({
    onClose: noop,
    disableEscapeKeyDown: true,
  }),
)(BaseModal);
