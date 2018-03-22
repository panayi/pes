import * as R from 'ramda';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import { actions as modalActions } from 'store/modals';

const DesktopTrigger = R.always(null);

const mapDispatchToProps = {
  openModal: modalActions.openModal,
};

let alreadyRun = false;

export default R.compose(
  connect(null, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      if (alreadyRun) {
        return;
      }

      const { timeout, openModal } = this.props;

      setTimeout(() => {
        openModal('rate');
        alreadyRun = true;
      }, timeout);
    },
  }),
)(DesktopTrigger);
