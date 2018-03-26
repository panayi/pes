import { models } from 'store/firebase/data';
import { isBetaUserSelector } from 'pages/beta';

// BETA

const requireNonBetaUser = async (req, res, next) => {
  const { store } = res.locals;
  await store.firebase.promiseEvents([models.betaUsers.all.query({})]);
  const isBetaUser = isBetaUserSelector(store.getState());

  if (isBetaUser) {
    res.redirect('/');
    res.end();
  } else {
    next();
  }
};

export default requireNonBetaUser;
