import { database } from '../config/firebaseClient';
import * as betaInviteModel from './betaInvite';

export const get = async userId =>
  database.ref(`/betaUsers/${userId}`).once('value');

export const create = async (code, currentUserId) => {
  const isValid = await betaInviteModel.validate(code);

  if (!isValid) {
    throw new Error('Invalid beta invite code');
  }

  // Check if betaUser already exists
  const betaUserSnapshot = await get(currentUserId);
  if (betaUserSnapshot.exists()) {
    throw new Error('Beta user already exists');
  }

  await database.ref(`/betaUsers/${currentUserId}`).set(true);
};
