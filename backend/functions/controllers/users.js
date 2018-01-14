import * as functions from 'firebase-functions';
import * as userModel from '../models/user';
import * as draftAdModel from '../models/draftAd';

const handleUserCreated = async event => {
  const { uid } = event.params;
  await draftAdModel.move(event.data, uid);
  return userModel.unsetAnonymousUser(uid);
};

const handleUserUpdated = async event => {
  const { uid } = event.params;
  await draftAdModel.move(event.data, uid);
  return userModel.unsetAnonymousUser(uid);
};

export const userCreated = functions.database
  .ref('/users/{uid}')
  .onWrite(handleUserCreated);
export const userUpdated = functions.database
  .ref('/users/{uid}')
  .onWrite(handleUserUpdated);
