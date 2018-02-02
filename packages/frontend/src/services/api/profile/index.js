export const update = data => (dispatch, getState, getFirebase) =>
  getFirebase().updateProfile(data);
