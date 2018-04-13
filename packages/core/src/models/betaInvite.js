import * as R from 'ramda';
import { isPlainObj } from 'ramda-adjunct';
import env from '../config/env';
import { database } from '../config/firebaseClient';

const getAll = async () => {
  const snap = await database.ref(`/betaInvites`).once('value');
  return snap ? snap.val() : [];
};

export const get = async id => database.ref(`/betaInvites/${id}`).once('value');

export const getUrl = ({ code, name }) =>
  `https://${env.domain}/beta?code=${code}&name=${name}`;

export const getWithUrl = async id => {
  const betaInviteSnapshot = await database
    .ref(`/betaInvites/${id}`)
    .once('value');
  const betaInvite = betaInviteSnapshot.val();
  return betaInvite
    ? R.merge(betaInvite, { url: getUrl(betaInvite) })
    : betaInvite;
};

const findByEmail = async email => {
  const betaInvites = await getAll();

  return R.compose(R.find(R.propEq('email', email)), R.defaultTo([]), R.values)(
    betaInvites,
  );
};

const findByCode = async code => {
  const betaInvites = await getAll();

  return R.compose(R.find(R.propEq('code', code)), R.defaultTo([]), R.values)(
    betaInvites,
  );
};

export const create = async props => {
  const { email } = props;
  const betaInvite = await findByEmail(email);

  if (isPlainObj(betaInvite)) {
    return Promise.reject('Beta invite for this email already exists');
  }

  return database.ref(`/betaInvites`).push(props);
};

export const validate = async code => {
  const betaInvite = await findByCode(code);
  return isPlainObj(betaInvite);
};
