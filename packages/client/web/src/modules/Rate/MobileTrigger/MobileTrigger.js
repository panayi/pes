import * as R from 'ramda';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import { actions as modalActions } from '@pesposa/client-core/src/store/modals';

const DesktopTrigger = R.always(null);

const mapDispatchToProps = {
  openModal: modalActions.openModal,
};

let alreadyScheduled = false;

export default R.compose(
  connect(null, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      if (alreadyScheduled) {
        return;
      }

      alreadyScheduled = true;

      const { timeout, openModal } = this.props;

      setTimeout(() => {
        openModal('rate');
      }, timeout);
    },
  }),
)(DesktopTrigger);
