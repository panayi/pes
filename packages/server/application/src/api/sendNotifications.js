import * as R from 'ramda';
import log from '@pesposa/core/src/utils/log';
import * as respond from '@pesposa/core/src/utils/respond';
import firebase from '@pesposa/server-core/src/config/firebaseClient';
import server from '@pesposa/server-core/src/server';
import sendMessageReceivedEmail from '../emails/messageReceived';

const sendNotifications = async (req, res) => {
  try {
    const conversations = await server.conversations.getAllShouldNotify(
      firebase,
    );
    await Promise.all(
      R.map(async conversation => {
        await sendMessageReceivedEmail(conversation);
        await server.conversations.markAsNotified(firebase, conversation.path);
      }, conversations),
    );

    res.send('OK');
  } catch (error) {
    log.error('/api/send-notifications failed');
    log.error(error);
    respond.internalServerError(res);
  }
};

export default sendNotifications;
