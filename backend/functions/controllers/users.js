import * as functions from 'firebase-functions';
import * as userModel from '../models/user';

const handleUserCreatedOrUpdated = async event => {
  const userSnapshot = event.data;

  // No need to call migrateAnonymousUser
  // when `anonymousUserId` has not changed
  if (userSnapshot.child('anonymousUserId').changed()) {
    return userModel.migrateAnonymousUser(userSnapshot);
  }

  return null;
};

export const userCreated = functions.database
  .ref('/users/{uid}')
  .onCreate(handleUserCreatedOrUpdated);
export const userUpdated = functions.database
  .ref('/users/{uid}')
  .onUpdate(handleUserCreatedOrUpdated);
