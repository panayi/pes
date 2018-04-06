import { isNilOrEmpty } from 'ramda-adjunct';
import * as functions from 'firebase-functions';
import server from '@pesposa/server-core/src/server';
import firebase from '@pesposa/server-core/src/config/firebaseClient';

const handleExternalUserUserCreated = async (change, context) => {
  const { id } = context.params;
  const user = change.after.val();

  if (isNilOrEmpty(user)) {
    return null;
  }

  return server.convertExternalUserTasks.converted(firebase, id);
};

const externalUserUserCreated = functions.database
  .ref('/externalUsers/{id}/user')
  .onWrite(handleExternalUserUserCreated);

export default externalUserUserCreated;
