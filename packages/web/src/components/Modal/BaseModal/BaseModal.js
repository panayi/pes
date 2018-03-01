// @flow weak
import React from 'react';
import * as R from 'ramda';
import { noop } from 'ramda-adjunct';
import { withProps, defaultProps } from 'recompose';
import Dialog from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
import DialogTitle from './Title/Title';
import DialogContent from './Content/Content';
import DialogActions from './Actions/Actions';
import { responsiveStyles, hideMobileClass, hideDesktopClass } from './utils';

type Props = {
  content: React$Component<*>,
  mobile: string,
  closeButton: boolean,
  onClose: Function,
  direction: string,
  contentProps: Object,
  classes: Object,
};

const fullSizeStyles = {
  width: '100%',
  maxWidth: '100%',
  height: '100vh',
  maxHeight: '100vh',
  margin: 0,
};

const styles = theme => ({
  closeButton: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  'fullScreen-sm': {
    [theme.breakpoints.down('sm')]: fullSizeStyles,
  },
  'fullScreen-md': {
    [theme.breakpoints.down('md')]: fullSizeStyles,
  },
  'fullScreen-lg': {
    [theme.breakpoints.down('lg')]: fullSizeStyles,
  },
  ...responsiveStyles(theme),
});

class Modal extends React.Component<Props> {
  constructor(props) {
    super(props);
    const { mobile, dialogTitle } = props;
    this.dialogTitle = withProps({ mobile })(dialogTitle || DialogTitle);
    this.dialogContent = withProps({ mobile })(DialogContent);
    this.dialogActions = withProps({ mobile })(DialogActions);
  }

  render() {
    const {
      content: Content,
      closeButton,
      onClose,
      direction,
      mobile,
      contentProps,
      classes,
      ...rest
    } = this.props;

    const fullScreenClassName = classes[`fullScreen-${mobile}`];

    const hideMobile = hideMobileClass(mobile, classes);
    const hideDesktop = hideDesktopClass(mobile, classes);

    const finalContentProps = {
      ...contentProps,
      DialogTitle: this.dialogTitle,
      DialogContent: this.dialogContent,
      DialogActions: this.dialogActions,
      hideMobile,
      hideDesktop,
    };

    return (
      <Dialog
        onClose={onClose}
        classes={{ paper: fullScreenClassName }}
        {...rest}
      >
        <Content {...finalContentProps} />
      </Dialog>
    );
  }
}

export default R.compose(
  defaultProps({
    onClose: noop,
    mobile: 'sm',
    disableEscapeKeyDown: true,
  }),
  withStyles(styles),
)(Modal);
