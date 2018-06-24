import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import withStyles from '@material-ui/core/styles/withStyles';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import { actions as modalActions } from '../../store/modals';
import { selectors as authSelectors } from '../../store/firebase/auth';
import { selectors as profileSelectors } from '../../store/firebase/profile';
import { selectors as userInfoSelectors } from '../../store/userInfo';
import ReduxModal from '../Modal/ReduxModal/ReduxModal';
import ConfirmAdult from './ConfirmAdult/ConfirmAdult';

const styles = theme => ({
  confirmAdultBackdrop: {
    backgroundColor: theme.palette.common.black,
  },
});

class RequireAdult extends React.Component {
  componentDidMount() {
    this.confirmAdultWhenEnabled();
    this.checkAdult();
  }

  componentDidUpdate(prevProps) {
    if (propsChanged(['enabled', 'isLoading'], this.props, prevProps)) {
      this.confirmAdultWhenEnabled();
    }
    if (propsChanged(['allow'], this.props, prevProps)) {
      this.checkAdult();
    }
  }

  confirmAdult = ({ onAccept, onReject }) => {
    const { id, allow, openModal } = this.props;
    this.onAccept = onAccept;
    if (!allow) {
      openModal(id, {
        onReject,
      });
    } else {
      this.checkAdult();
    }
  };

  confirmAdultWhenEnabled() {
    const { enabled, isLoading, onReject } = this.props;
    if (enabled && !isLoading) {
      this.confirmAdult({
        onReject,
      });
    }
  }

  checkAdult() {
    const { id, allow, onAccept, closeModal } = this.props;
    if (allow) {
      const finalOnAccept = onAccept || this.onAccept;
      if (finalOnAccept) {
        finalOnAccept();
      }
      closeModal(id);
    }
  }

  render() {
    const { id, enabled, allow, isLoading, children, classes } = this.props;
    const finalChildren = R.is(Function, children)
      ? children({ confirmAdult: this.confirmAdult })
      : children;

    return (
      <React.Fragment>
        {enabled && !isLoading && !allow ? null : finalChildren}
        <ReduxModal
          id={id}
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

const allowSelector = createSelector(
  profileSelectors.profileAdultSelector,
  userInfoSelectors.isBotSelector,
  R.or,
);

const mapStateToProps = createStructuredSelector({
  allow: allowSelector,
  isLoading: isLoadingSelector,
});

const mapDispatchToProps = {
  openModal: modalActions.openModal,
  closeModal: modalActions.closeModal,
};

export default R.compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles),
)(RequireAdult);
