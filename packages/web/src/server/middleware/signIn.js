import * as R from 'ramda';
import firebase from 'firebase-admin';

const signIn = async (req, res, next) => {
  const { store } = res.locals;

  // Sign-in user using session
  const userId = R.path(['session', 'decodedToken', 'user_id'], req);
  const isAnonymous = R.pathEq(
    ['session', 'decodedToken', 'provider_id'],
    'anonymous',
    req,
  );

  if (userId && !isAnonymous) {
    await firebase
      .auth()
      .createCustomToken(req.session.decodedToken.user_id)
      .then(token => store.firebase.auth().signInWithCustomToken(token));
  }

  next();
};

export default signIn;
