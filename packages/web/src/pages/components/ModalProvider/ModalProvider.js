import React from 'react';
import * as R from 'ramda';
import modals from './modals';

const ModalProvider = R.always(
  R.compose(
    R.map(([id, ModalComponent]) => <ModalComponent key={id} id={id} />),
    R.toPairs,
  )(modals),
);

export default ModalProvider;
