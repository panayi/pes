import * as R from 'ramda';
import { isPlainObj } from 'ramda-adjunct';
import { database } from '../config/firebaseClient';

const getAll = async () => database.ref(`/betaInvites`).once('value');

const get = async ({ code, email }) => {
  const betaInvites = (await getAll()).val();

  return R.compose(
    R.find(obj => obj.code === code && obj.email === email),
    R.defaultTo([]),
    R.values,
  )(betaInvites);
};

export const valid = async ({ code, email }) => {
  const betaInvite = await get({ code, email });
  return isPlainObj(betaInvite);
};
