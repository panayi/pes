import React from 'react';
import * as R from 'ramda';
import ouibounce from 'ouibounce';
import { connect } from 'react-redux';
import { actions as modalActions } from '../../../store/modals';

class OpenModalOnBounce extends React.Component {
  componentDidMount() {
    this.setupOuibounce();
  }

  componentWillUnmount() {
    // disable the ouibounce on unmount
    if (this.handlerRef) {
      this.handlerRef.disable();
    }
  }

  setupOuibounce = () => {
    const ouiBounceProps = R.omit(['modalId'], this.props);

    this.handlerRef = ouibounce(false, {
      ...ouiBounceProps,
      callback: this.handleOpen,
    });
  };

  handleOpen = () => {
    const { openModal, modalId } = this.props;
    openModal(modalId);
  };

  render() {
    return null;
  }
}

const mapDispatchToProps = {
  openModal: modalActions.openModal,
};

export default connect(
  null,
  mapDispatchToProps,
)(OpenModalOnBounce);
