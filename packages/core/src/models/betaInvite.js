import * as R from 'ramda';
import env from '../config/env';
import { database } from '../config/firebaseClient';

const getAll = async () => {
  const snap = await database.ref(`/betaInvites`).once('value');
  return snap ? snap.val() : [];
};

export const get = async id => database.ref(`/betaInvites/${id}`).once('value');

export const getUrl = ({ email, code }) =>
  `https://${env.domain}/beta/?email=${email}&code=${code}`;

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

const findByEmailAndCode = async ({ email, code }) => {
  const betaInvites = await getAll();

  return R.compose(
    R.find(obj => obj.code === code && obj.email === email),
    R.defaultTo([]),
    R.values,
  )(betaInvites);
};

export const create = async props => {
  const { email } = props;
  const betaInviteSnapshot = await findByEmail(email);

  if (betaInviteSnapshot && betaInviteSnapshot.val()) {
    return Promise.reject('Beta invite for this email already exists');
  }

  return database.ref(`/betaInvites`).push(props);
};

export const valid = async ({ email, code }) => {
  const betaInviteSnapshot = await findByEmailAndCode({ email, code });
  return betaInviteSnapshot && betaInviteSnapshot.val();
};
