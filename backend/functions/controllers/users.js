import * as functions from 'firebase-functions';
import * as userModel from '../models/user';

const handleUserCreatedOrUpdated = async event => {
  const userSnapshot = event.data;
  return userModel.migrateAnonymousUser(userSnapshot);
};

export const userCreated = functions.database
  .ref('/users/{uid}')
  .onCreate(handleUserCreatedOrUpdated);
export const userUpdated = functions.database
  .ref('/users/{uid}')
  .onUpdate(handleUserCreatedOrUpdated);
