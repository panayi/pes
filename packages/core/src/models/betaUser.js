import { database } from '../config/firebaseClient';
import * as betaInviteModel from './betaInvite';

export const get = async userId =>
  database.ref(`/betaUsers/${userId}`).once('value');

export const create = async ({ code, email }, currentUserId) => {
  const isValid = await betaInviteModel.valid({ code, email });

  if (!isValid) {
    throw new Error('Invalid beta invite');
  }

  // Check if betaUser already exists
  const betaUserSnapshot = await get(currentUserId);
  const betaUser = betaUserSnapshot && betaUserSnapshot.val();
  if (betaUser) {
    throw new Error('Beta user already exists');
  }

  await database.ref(`/betaUsers/${currentUserId}`).set(true);
};
