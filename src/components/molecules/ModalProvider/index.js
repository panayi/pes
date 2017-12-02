import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectors } from 'store/modals';
import Modal from './Modal';

const ModalProvider = R.compose(
  R.map(([id, modalProps]) => (
    <Modal key={id} id={id} modalProps={modalProps} />
  )),
  R.toPairs,
  R.prop('modals'),
);

const mapStateToProps = createStructuredSelector({
  modals: selectors.modalsSelector,
});

export default connect(mapStateToProps)(ModalProvider);
