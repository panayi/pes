import profileFactory from 'services/firebase/profileFactory';

export const updateProfile = user => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();

  firebase.updateProfile(profileFactory(user));
};
