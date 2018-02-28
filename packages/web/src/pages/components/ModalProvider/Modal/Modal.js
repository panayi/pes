// @flow weak
import React from 'react';
import * as R from 'ramda';
import { withProps, setDisplayName } from 'recompose';
import { connect } from 'react-redux';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogActions,
} from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import Slide from 'material-ui/transitions/Slide';
import { withStyles } from 'material-ui/styles';
import { Close } from 'material-ui-icons';
import { selectors, actions as modalActions } from 'store/modals';

type Props = {
  content: React$Component<*>,
  actions: React$Component<*>,
  isOpen: boolean,
  onExited: ?Function,
  closeButton: boolean,
  hideModal: Function,
  dialogClassName: string,
  fullScreen: string | boolean,
  direction: string,
  classes: Object,
};

const padding = (direction, theme) => ({
  [`padding${direction}`]: `${5 * theme.spacing.unit}px !important`,
  [theme.breakpoints.down('md')]: {
    [`padding${direction}`]: `${2 * theme.spacing.unit}px !important`,
  },
});

const fullSizeStyles = {
  width: '100%',
  maxWidth: '100%',
  height: '100vh',
  maxHeight: '100vh',
  margin: 0,
};

const styles = theme => ({
  fullScreen: {
    top: 56,
    zIndex: 1099, // 1 less than header's z-index
  },
  'fullSize-sm': {
    [theme.breakpoints.down('sm')]: fullSizeStyles,
  },
  'fullSize-md': {
    [theme.breakpoints.down('md')]: fullSizeStyles,
  },
  'fullSize-lg': {
    [theme.breakpoints.down('lg')]: fullSizeStyles,
  },
  title: {
    ...padding('top', theme),
    ...padding('right', theme),
    ...padding('left', theme),
  },
  content: {
    ...padding('', theme),
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

const StyledDialogContent = R.compose(
  setDisplayName('DialogContent'),
  withStyles(styles),
  withProps(({ classes }) => ({
    classes: {
      root: classes.content,
    },
  })),
)(DialogContent);

const StyledDialogTitle = R.compose(
  setDisplayName('DialogTitle'),
  withStyles(styles),
  withProps(({ classes }) => ({
    classes: {
      root: classes.title,
    },
  })),
)(DialogTitle);

const renderTitle = children => (
  <StyledDialogTitle>{children}</StyledDialogTitle>
);

const renderContent = children => (
  <StyledDialogContent>{children}</StyledDialogContent>
);

const renderActions = children =>
  children ? <DialogActions>{children}</DialogActions> : null;

const Transition = props => <Slide direction="down" {...props} />;

const Modal = (props: Props) => {
  const {
    content: Content,
    isOpen,
    closeButton,
    onExited,
    hideModal,
    fullScreen,
    direction,
    dialogClassName,
    classes,
    ...rest
  } = props;

  const componentProps = {
    ...rest,
    hideModal,
    renderTitle,
    renderContent,
    renderActions,
  };

  const fullScreenProps = R.is(String, fullScreen)
    ? {
        classes: { paper: classes[`fullSize-${fullScreen}`] },
      }
    : {
        fullScreen,
        classes: { root: classes.fullScreen },
      };

  return (
    <Dialog
      open={isOpen}
      onClose={hideModal}
      onExited={onExited}
      disableEscapeKeyDown
      transition={direction ? Transition : undefined}
      className={dialogClassName}
      {...fullScreenProps}
    >
      {closeButton && (
        <IconButton className={classes.closeButton} onClick={() => hideModal()}>
          <Close />
        </IconButton>
      )}
      <Content {...componentProps} />
    </Dialog>
  );
};

Modal.defaultProps = {
  fullScreen: 'sm',
};

const mapStateToProps = (state, props) => ({
  ...selectors.modalPropsSelector(state, props),
  isOpen: selectors.isOpenSelector(state, props),
});

const mapDispatchToProps = {
  hideModal: modalActions.hideModal,
};

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps(({ id, hideModal }) => ({
    hideModal: () => hideModal(id),
  })),
  withStyles(styles),
)(Modal);
