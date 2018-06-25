import * as R from 'ramda';
import crypto from 'crypto';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';

/*
|--------------------------------------------------------------------------
| Read
|--------------------------------------------------------------------------
*/
export const get = async (firebase, code) =>
  firebase
    .ref(`${modelPaths.EXTERNAL_USER_CODES.string}/${code}`)
    .once('value');

export const getByValue = async (firebase, value) =>
  firebase
    .ref(modelPaths.EXTERNAL_USER_CODES.string)
    .orderByValue()
    .equalTo(value)
    .once('value');

export const getCodeForExternalUser = async (firebase, externalUserId) => {
  const codeSnap = await getByValue(firebase, externalUserId);
  return R.compose(
    R.head,
    R.keys,
    R.defaultTo({}),
  )(codeSnap.val());
};

/*
|--------------------------------------------------------------------------
| Write
|--------------------------------------------------------------------------
*/
export const create = async (firebase, externalUserId) => {
  // Make sure there isn't already a code for this externalUserId
  const existingExternalUserIdSnap = await getByValue(firebase, externalUserId);
  if (existingExternalUserIdSnap.hasChildren()) {
    return null;
  }

  const buffer = crypto.randomBytes(8);
  const code = buffer.toString('hex');

  const existingCodeSnap = await get(firebase, code);

  // Make sure the code doesn't exist already
  if (existingCodeSnap.exists()) {
    return create(firebase, externalUserId);
  }

  return firebase.set(
    `${modelPaths.EXTERNAL_USER_CODES.string}/${code}`,
    externalUserId,
  );
};
