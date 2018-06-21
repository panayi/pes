import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as modalActions } from '@pesposa/client-core/src/store/modals';
import ReduxModal from '@pesposa/client-core/src/components/Modal/ReduxModal/ReduxModal';
import Content from './Content/Content';

export class Confirm extends Component {
  handleOpenModal = () => {
    const {
      message,
      acceptLabel,
      rejectLabel,
      onAccept,
      openModal,
    } = this.props;
    openModal('confirm', {
      message,
      acceptLabel,
      rejectLabel,
      onAccept,
    });
  };

  render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        {children({
          openModal: this.handleOpenModal,
        })}
        <ReduxModal id="confirm" content={Content} />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  openModal: modalActions.openModal,
};

export default connect(null, mapDispatchToProps)(Confirm);
