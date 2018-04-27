import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import env from '../config/env';
import { database } from '../config/firebaseClient';

const getAll = async () => {
  const snap = await database.ref(`/betaInvites`).once('value');
  return snap ? snap.val() : [];
};

export const get = async id => database.ref(`/betaInvites/${id}`).once('value');

export const getUrl = ({ code, name }) =>
  `https://${env.domain}/login?code=${code}&name=${name}`;

export const getWithUrl = async id => {
  const betaInviteSnapshot = await database
    .ref(`/betaInvites/${id}`)
    .once('value');
  const betaInvite = betaInviteSnapshot.val();
  return betaInvite
    ? R.merge(betaInvite, { url: getUrl(betaInvite) })
    : betaInvite;
};

const findBy = async (key, value) => {
  const betaInvites = await getAll();

  return R.compose(
    R.find(arr => arr[1] && arr[1][key] === value),
    R.defaultTo([]),
    R.toPairs,
  )(betaInvites);
};

const findByEmail = async email => findBy('email', email);

export const findByCode = async code => findBy('code', code);

export const findByUser = async user => findBy('user', user);

export const create = async (props, options = {}) => {
  const { email } = props;
  const { force } = options;
  const betaInvite = await findByEmail(email);

  if (!R.isNil(email) && !force && !isNilOrEmpty(betaInvite)) {
    return Promise.reject('Beta invite for this email already exists');
  }

  return database.ref(`/betaInvites`).push(props);
};

export const validate = async code => {
  const betaInvite = await findByCode(code);
  return !isNilOrEmpty(betaInvite);
};
