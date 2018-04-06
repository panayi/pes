import * as modelPaths from '../config/modelPaths';

/*
|--------------------------------------------------------------------------
| Read
|--------------------------------------------------------------------------
*/
export const get = async (firebase, id) =>
  firebase.ref(`${modelPaths.EXTERNAL_USERS.string}/${id}`).once('value');

export const findByEmail = async (firebase, email) => {
  const snap = await firebase
    .ref(modelPaths.EXTERNAL_USERS.string)
    .orderByChild('email')
    .equalTo(email)
    .once('value');

  let externalUserSnap;
  snap.forEach(child => {
    externalUserSnap = child;
  });

  return externalUserSnap;
};

export const findByPhone = async (firebase, phone) => {
  const snap = await firebase
    .ref(modelPaths.EXTERNAL_USERS.string)
    .orderByChild('phone')
    .equalTo(phone)
    .once('value');

  let externalUserSnap;
  snap.forEach(child => {
    externalUserSnap = child;
  });

  return externalUserSnap;
};

export const hasUser = async (firebase, id) => {
  const snap = await firebase
    .ref(`${modelPaths.EXTERNAL_USERS.string}/${id}/user`)
    .once('value');
  return snap.exists();
};

/*
|--------------------------------------------------------------------------
| Write
|--------------------------------------------------------------------------
*/
export const create = async (firebase, data) => {
  const ref = await firebase.push(modelPaths.EXTERNAL_USERS.string, data);
  return ref.getKey();
};

export const update = (firebase, id, data) =>
  firebase.update(`/${modelPaths.EXTERNAL_USERS.string}/${id}`, data);

export const remove = (firebase, id) =>
  firebase.remove(`/${modelPaths.EXTERNAL_USERS.string}/${id}`);

export const migrateToUser = (firebase, code) =>
  firebase.functions().httpsCallable('migrateToUser')({ code });
