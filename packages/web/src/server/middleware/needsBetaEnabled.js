import env from '@pesposa/core/src/config/env';

// BETA

const needsBetaEnabled = (req, res, next) => {
  if (!env.betaEnabled) {
    res.redirect('/');
    res.end();
  } else {
    next();
  }
};

export default needsBetaEnabled;
