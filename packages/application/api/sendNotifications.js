import * as R from 'ramda';
import log from '@pesposa/core/src/utils/log';
import * as respond from '@pesposa/core/src/utils/respond';
import * as conversationModel from '@pesposa/core/src/models/conversation';
import sendMessageReceivedEmail from '../emails/messageReceived';

const sendNotifictions = async (req, res) => {
  try {
    const conversations = await conversationModel.getAllShouldNotify();
    await Promise.all(
      R.map(
        async conversation => {
          await sendMessageReceivedEmail(conversation);
          await conversationModel.markAsNotified(conversation.path);
        },
        conversations
      )
    );

    res.send('OK');
  } catch (error) {
    log.error('Failed to send email notifications');
    log.error(error);
    respond.internalServerError(res);
  }
};

export default sendNotifictions;
