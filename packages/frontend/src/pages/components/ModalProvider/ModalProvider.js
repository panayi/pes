import React from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import Login from 'modules/Login/Login';
import CreateAd from 'modules/PostAd/CreateAd/CreateAd';
import EditAd from 'modules/PostAd/EditAd/EditAd';
import Modal from './Modal/Modal';

const modals = {
  login: withProps({ content: Login, closeButton: true })(Modal),
  createAd: withProps({ content: CreateAd })(Modal),
  editAd: withProps({ content: EditAd })(Modal),
};

const ModalProvider = R.always(
  R.compose(
    R.map(([id, ModalComponent]) => <ModalComponent key={id} id={id} />),
    R.toPairs,
  )(modals),
);

export default ModalProvider;
