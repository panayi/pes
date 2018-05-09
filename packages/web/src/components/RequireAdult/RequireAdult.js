import React from 'react';
import * as R from 'ramda';
import { noop } from 'ramda-adjunct';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import withStyles from 'material-ui/styles/withStyles';
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
  componentDidMount() {
    this.confirmAdultWhenEnabled();
  }

  componentDidUpdate(prevProps) {
    if (propsChanged(['enabled', 'hasUid'], this.props, prevProps)) {
      this.confirmAdultWhenEnabled();
    }
  }

  confirmAdultWhenEnabled() {
    const { enabled, hasUid } = this.props;
    if (enabled && hasUid) {
      this.confirmAdult({
        onAccept: this.props.onAccept,
        onReject: this.props.onReject,
      });
    }
  }

  confirmAdult = ({ onAccept, onReject }) => {
    const { adult, hasUid, openModal } = this.props;
    const finalOnAccept = onAccept || noop;
    const finalOnReject = onReject || noop;
    if (!adult) {
      openModal('confirmAdult', {
        onAccept: finalOnAccept,
        onReject: finalOnReject,
        hasUid,
      });
    } else {
      finalOnAccept();
    }
  };

  render() {
    const { enabled, hasUid, adult, children, classes } = this.props;
    const finalChildren = R.is(Function, children)
      ? children({ confirmAdult: this.confirmAdult })
      : children;

    return (
      <React.Fragment>
        {enabled && hasUid && !adult ? null : finalChildren}
        <ReduxModal
          BackdropProps={{ className: classes.confirmAdultBackdrop }}
          id="confirmAdult"
          content={ConfirmAdult}
          disableEscapeKeyDown
          disableBackdropClick
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  hasUid: authSelectors.hasUidSelector,
  adult: profileSelectors.profileAdultSelector,
});

const mapDispatchToProps = {
  openModal: modalActions.openModal,
};

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(RequireAdult);
