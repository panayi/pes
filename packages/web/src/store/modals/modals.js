import modalFactory from './factory';

const modals = {
  login: modalFactory('login'),
  createAd: modalFactory('createAd'),
  editAd: modalFactory('editAd'),
  support: modalFactory('support'),
  filters: modalFactory('filters'),
  menu: modalFactory('menu'),
};

export default modals;
