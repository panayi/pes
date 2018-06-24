import * as R from 'ramda';
import * as functions from 'firebase-functions';
import log from '@pesposa/core/src/utils/log';
import client from '@pesposa/core/src/client';
import firebase from '@pesposa/server-core/src/config/firebaseClient';
import * as zendeskService from '@pesposa/server-core/src/services/zendesk';

const handleCreate = async (snap, context) => {
  const id = R.path(['params', 'id'], context);
  const support = snap.val();
  const { uid, email } = support;
  let finalName = email;

  if (uid) {
    const userSnapshot = await client.users.get(firebase, uid);
    const name =
      userSnapshot && R.path(['profile', 'name'], userSnapshot.val());
    if (name) {
      finalName = name;
    }
  }

  try {
    await zendeskService.createTicket(R.merge(support, { name: finalName }));
    await client.support.remove(firebase, id);
  } catch (error) {
    log.error(`Failed to create Zendesk ticket for support with id=${id}`);
    log.error(error);
  }
};

const supportMessageCreated = functions.database
  .ref('/support/{id}')
  .onCreate(handleCreate);

export default supportMessageCreated;
