import * as functions from 'firebase-functions';
import firebase from '@pesposa/server-core/src/config/firebaseClient';
import server from '@pesposa/server-core/src/server';

const handleTaskWritten = async (change, context) => {
  const beforeExists = change.before.exists();
  const afterExists = change.after.exists();

  // Don't care about updates
  if (beforeExists && afterExists) {
    return null;
  }

  const { taskType } = context.params;
  return server.taskCounters.set(firebase, taskType);
};

const taskWritten = functions.database
  .ref('/tasks/{taskType}/{id}')
  .onWrite(handleTaskWritten);

export default taskWritten;
