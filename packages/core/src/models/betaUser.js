import { isArray } from 'ramda-adjunct';
import { database } from '../config/firebaseClient';
import * as betaInviteModel from './betaInvite';
import * as legacyAdModel from './legacyAd';

export const get = async userId =>
  database.ref(`/betaUsers/${userId}`).once('value');

export const create = async (code, currentUserId) => {
  const isValid = await betaInviteModel.validate(code);

  if (!isValid) {
    throw new Error('Invalid beta invite code');
  }

  await database.ref(`/betaUsers/${currentUserId}`).set(true);

  // Also save currentUserId on betaInvite object
  const betaInvite = await betaInviteModel.findByCode(code);

  if (isArray(betaInvite) && betaInvite[0]) {
    const betaInviteId = betaInvite[0];

    await database.ref(`/betaInvites/${betaInviteId}/user`).set(currentUserId);
    await legacyAdModel.associateUserToLegacyAds(currentUserId);
  }
};
