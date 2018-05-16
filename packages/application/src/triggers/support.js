import * as R from 'ramda';
import * as functions from 'firebase-functions';
import log from '@pesposa/core/src/utils/log';
import * as zendeskService from '@pesposa/core/src/services/zendesk';
import * as userModel from '@pesposa/core/src/models/user';
import * as supportModel from '@pesposa/core/src/models/support';

const handleCreate = async (snap, context) => {
  const { id } = context.params;
  const support = snap.val();
  const { uid, email } = support;
  let name = email;

  if (uid) {
    const userSnapshot = await userModel.get(uid);
    const displayName =
      userSnapshot && R.path(['profile', 'displayName'], userSnapshot.val());
    if (displayName) {
      name = displayName;
    }
  }

  try {
    await zendeskService.createTicket(R.merge(support, { name }));
    await supportModel.remove(id);
  } catch (error) {
    log.error(`Failed to create Zendesk ticket for support with id=${id}`);
    log.error(error);
  }
};

export const supportMessageCreated = functions.database
  .ref('/support/{id}')
  .onCreate(handleCreate);
