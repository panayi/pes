import modalFactory from './factory';

const modals = {
  login: modalFactory('login'),
  createAd: modalFactory('createAd'),
  editAd: modalFactory('editAd'),
};

export default modals;
