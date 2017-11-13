import { utils } from 'store/firebase';

export const updateProfile = user => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();

  firebase.updateProfile(utils.profileFactory(user));
};
