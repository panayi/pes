// @flow weak
import React from 'react';
import * as R from 'ramda';
import { withProps, setDisplayName } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogActions,
} from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import { Close } from 'material-ui-icons';
import { selectors, actions as modalActions } from 'store/modals';

type ModalProps = {
  title: String,
  closeButton: boolean,
};

type Props = {
  content: React$Component<*>,
  actions: React$Component<*>,
  modalProps: ModalProps,
  isOpen: boolean,
  hideModal: Function,
  classes: Object,
};

const padding = theme => `${5 * theme.spacing.unit}px`;

const styles = theme => ({
  title: {
    padding: padding(theme),
  },
  content: {
    padding: `0 ${padding(theme)} ${padding(theme)} ${padding(theme)}`,
  },
  closeButton: {
    float: 'right',
    marginTop: -5 * theme.spacing.unit,
    marginRight: -5 * theme.spacing.unit,
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

const renderContent = children => (
  <StyledDialogContent>{children}</StyledDialogContent>
);

const renderActions = children =>
  children ? <DialogActions>{children}</DialogActions> : null;

const Modal = (props: Props) => {
  const {
    content: Content,
    modalProps,
    isOpen,
    hideModal,
    classes,
    ...rest
  } = props;

  // Pick more props as needed.
  // Dialog props: https://material-ui-next.com/api/dialog/
  const dialogProps = R.pick(['onExited'], modalProps);
  const { title, closeButton } = modalProps;
  const componentProps = {
    ...rest,
    ...modalProps,
    hideModal,
    renderContent,
    renderActions,
  };

  return (
    <Dialog
      key="1"
      open={isOpen}
      onClose={hideModal}
      disableEscapeKeyDown
      {...dialogProps}
    >
      {(title || closeButton) && (
        <DialogTitle classes={{ root: classes.title }}>
          {title}
          {closeButton && (
            <IconButton
              className={classes.closeButton}
              onClick={() => hideModal()}
            >
              <Close />
            </IconButton>
          )}
        </DialogTitle>
      )}
      <Content {...componentProps} />
    </Dialog>
  );
};

const mapStateToProps = createStructuredSelector({
  content: selectors.componentForContentSelector,
  modalProps: selectors.modalPropsSelector,
  isOpen: selectors.isOpenSelector,
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
