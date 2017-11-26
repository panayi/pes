import * as R from 'ramda';
import { withProps } from 'recompose';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { actions } from 'store/modal';

const mapDispatchToProps = {
  showModal: actions.showModal,
};

export default R.compose(
  connect(null, mapDispatchToProps),
  withProps(({ modalComponent, modalProps, showModal }) => ({
    onClick: () => showModal(modalComponent, modalProps),
  })),
)(Button);
