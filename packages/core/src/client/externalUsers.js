import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { nameSelector } from '../selectors/users';
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

export const find = async (firebase, { email, phone }) => {
  let externalUserSnap;
  if (!isNilOrEmpty(email)) {
    externalUserSnap = await findByEmail(firebase, email);
  }

  if (!externalUserSnap && !isNilOrEmpty(phone)) {
    externalUserSnap = await findByPhone(firebase, phone);
  }

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
export const create = async (firebase, externalUser) => {
  const name = R.path(['profile', 'name'], externalUser);
  const email = R.prop('email', externalUser);
  const phone = R.path(['profile', 'phone'], externalUser);
  const finalName = name || nameSelector({ email, phone });
  const finalExternalUser = R.compose(
    R.reject(isNilOrEmpty),
    R.evolve({
      profile: R.reject(isNilOrEmpty),
    }),
    R.assocPath(['profile', 'name'], finalName),
  )(externalUser);
  const ref = await firebase.push(
    modelPaths.EXTERNAL_USERS.string,
    finalExternalUser,
  );
  return ref.getKey();
};

export const update = (firebase, id, data) =>
  firebase.update(`/${modelPaths.EXTERNAL_USERS.string}/${id}`, data);

export const remove = (firebase, id) =>
  firebase.remove(`/${modelPaths.EXTERNAL_USERS.string}/${id}`);

export const migrateToUser = (firebase, code) =>
  firebase.functions().httpsCallable('migrateToUser')({ code });
