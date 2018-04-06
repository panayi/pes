import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import * as draftsServer from './drafts';

/*
|--------------------------------------------------------------------------
| Read
|--------------------------------------------------------------------------
*/
export const getAll = async firebase =>
  firebase.ref(modelPaths.USERS.string).once('value');

export const get = async (firebase, userId) =>
  firebase.ref(`/${modelPaths.USERS.string}/${userId}`).once('value');

export const findByEmail = async (firebase, email) => {
  const snap = await firebase
    .ref(modelPaths.USERS.string)
    .orderByChild('email')
    .equalTo(email)
    .once('value');

  let userSnap;
  snap.forEach(child => {
    userSnap = child;
  });

  return userSnap;
};

export const findByPhone = async (firebase, phone) => {
  const snap = await firebase
    .ref(modelPaths.USERS.string)
    .orderByChild('phone')
    .equalTo(phone)
    .once('value');

  let userSnap;
  snap.forEach(child => {
    userSnap = child;
  });

  return userSnap;
};

export const getProviderById = async (firebase, providerId, userId) => {
  const user = (await get(firebase, userId)).val();
  const providerData = R.propOr([], 'providerData', user);
  return R.find(R.propEq('providerId', providerId), providerData);
};

/*
|--------------------------------------------------------------------------
| Write
|--------------------------------------------------------------------------
*/
export const update = async (firebase, props, userId) =>
  firebase.update(`${modelPaths.USERS.string}/${userId}`, props);

export const remove = async (firebase, userId) =>
  firebase.remove(`${modelPaths.USERS.string}/${userId}`);

export const migrateAnonymousUser = async (
  firebase,
  anonymousUserId,
  userId,
) => {
  const anonymousUser = (await get(firebase, anonymousUserId)).val();
  const user = (await get(firebase, userId)).val();

  if (isNilOrEmpty(user)) {
    throw new Error(`User with id=${userId} does not exist`);
  }

  // Move draft ad from anonymousUser to user
  await draftsServer.move(firebase, anonymousUserId, userId);

  // Move {`ip`, `location`} from anonymousUser to user
  if (!isNilOrEmpty(anonymousUser)) {
    const migrateProps = R.pick(['ip', 'location'], anonymousUser);
    await update(firebase, migrateProps, userId);
    await remove(firebase, anonymousUserId);
  }
};
