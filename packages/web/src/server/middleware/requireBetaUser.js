import env from '@pesposa/core/src/config/env';
import { models } from 'store/firebase/data';
import { isBetaUserSelector } from 'pages/beta';

// BETA

const requireBetaUser = async (req, res, next) => {
  if (!env.betaEnabled) {
    next();
    return;
  }

  const { store } = res.locals;
  await store.firebase.promiseEvents([models.betaUsers.all.query({})]);
  const isBetaUser = isBetaUserSelector(store.getState());

  if (isBetaUser) {
    next();
    return;
  }

  res.redirect('/beta');
  res.end();
};

export default requireBetaUser;
