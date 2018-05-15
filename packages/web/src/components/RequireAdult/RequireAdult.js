import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import withStyles from 'material-ui/styles/withStyles';
import generateId from '@pesposa/core/src/utils/generateId';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import { actions as modalActions } from 'store/modals';
import { selectors as authSelectors } from 'store/firebase/auth';
import { selectors as profileSelectors } from 'store/firebase/profile';
import ReduxModal from 'components/Modal/ReduxModal/ReduxModal';
import ConfirmAdult from './ConfirmAdult/ConfirmAdult';

const styles = theme => ({
  confirmAdultBackdrop: {
    backgroundColor: theme.palette.common.black,
  },
});

class RequireAdult extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.id = generateId();
  }

  componentDidMount() {
    this.confirmAdultWhenEnabled();
    this.checkAdult();
  }

  componentDidUpdate(prevProps) {
    if (propsChanged(['enabled', 'isLoading'], this.props, prevProps)) {
      this.confirmAdultWhenEnabled();
      if (prevProps.enabled && !this.props.enabled) {
        this.props.closeModal(this.id);
      }
    }
    if (propsChanged(['adult'], this.props, prevProps)) {
      this.checkAdult();
    }
  }

  checkAdult() {
    const { adult, closeModal } = this.props;
    if (adult) {
      const onAccept = this.props.onAccept || this.onAccept;
      if (onAccept) {
        onAccept();
      }
      closeModal(this.id);
    }
  }

  confirmAdultWhenEnabled() {
    const { enabled, isLoading } = this.props;
    if (enabled && !isLoading) {
      this.confirmAdult({
        onReject: this.props.onReject,
      });
    }
  }

  confirmAdult = ({ onAccept, onReject }) => {
    const { adult, openModal } = this.props;
    this.onAccept = onAccept;
    if (!adult) {
      openModal(this.id, {
        onReject,
      });
    } else {
      this.checkAdult();
    }
  };

  render() {
    const { enabled, adult, isLoading, children, classes } = this.props;
    const finalChildren = R.is(Function, children)
      ? children({ confirmAdult: this.confirmAdult })
      : children;

    return (
      <React.Fragment>
        {enabled && !isLoading && !adult ? null : finalChildren}
        <ReduxModal
          id={this.id}
          BackdropProps={{ className: classes.confirmAdultBackdrop }}
          content={ConfirmAdult}
          contentProps={{ isLoading }}
          disableEscapeKeyDown
          disableBackdropClick
        />
      </React.Fragment>
    );
  }
}

export const isLoadingSelector = createSelector(
  profileSelectors.profileLoadedSelector,
  authSelectors.isAuthenticatingSelector,
  authSelectors.hasUidSelector,
  (profileLoaded, isAuthenticating, hasUid) =>
    !profileLoaded || isAuthenticating || !hasUid,
);

const mapStateToProps = createStructuredSelector({
  adult: profileSelectors.profileAdultSelector,
  isLoading: isLoadingSelector,
});

const mapDispatchToProps = {
  openModal: modalActions.openModal,
  closeModal: modalActions.closeModal,
};

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(RequireAdult);
