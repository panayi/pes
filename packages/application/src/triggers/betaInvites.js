import * as functions from 'firebase-functions';
import * as betaInviteModel from '@pesposa/core/src/models/betaInvite';
import sendBetaInviteEmail from '../emails/betaInvite';

const handleCreate = async (snap, context) => {
  const { id } = context.params;
  const betaInvite = await betaInviteModel.getWithUrl(id);
  return betaInvite && betaInvite.email
    ? sendBetaInviteEmail(betaInvite)
    : null;
};

export const betaInviteCreated = functions.database
  .ref('/betaInvites/{id}')
  .onCreate(handleCreate);
