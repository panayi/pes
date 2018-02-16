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
  classes: Object,
};

const padding = theme => `${5 * theme.spacing.unit}px`;

const styles = theme => ({
  title: {
    padding: `${padding(theme)} ${padding(theme)} 0 ${padding(theme)}`,
  },
  content: {
    padding: padding(theme),
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

const Modal = (props: Props) => {
  const {
    content: Content,
    isOpen,
    closeButton,
    onExited,
    hideModal,
    classes,
    ...rest
  } = props;

  // Pick more props as needed.
  // Dialog props: https://material-ui-next.com/api/dialog/
  const componentProps = {
    ...rest,
    hideModal,
    renderTitle,
    renderContent,
    renderActions,
  };

  return (
    <Dialog
      key="1"
      open={isOpen}
      onClose={hideModal}
      onExited={onExited}
      disableEscapeKeyDown
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
