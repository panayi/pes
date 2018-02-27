import firebaseApi from 'services/firebase';

export const createSupportMessage = supportMessage => dispatch =>
  dispatch(firebaseApi.supportMessages.create(supportMessage));
