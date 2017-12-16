import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectors } from 'store/modals';
import Modal from './Modal';

const ModalProvider = R.compose(
  R.map(([id, ModalComponent = Modal]) => <ModalComponent key={id} id={id} />),
  R.prop('modalComponents'),
);

const mapStateToProps = createStructuredSelector({
  modalComponents: selectors.modalComponentsSelector,
});

export default connect(mapStateToProps)(ModalProvider);
