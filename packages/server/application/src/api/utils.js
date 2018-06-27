import * as R from 'ramda';
import firebase from '@pesposa/server-core/src/config/firebaseClient';
import log from '@pesposa/core/src/utils/log';
import * as respond from '@pesposa/core/src/utils/respond';

// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header
// like this:
// `[headerKey]: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
export const isAuthenticated = (options = {}) => (req, res, next) => {
  const { headerKey = 'authorization', propKey = 'user' } = options;
  const authorization = req.headers[headerKey];

  if (!authorization || !authorization.startsWith('Bearer ')) {
    log.error(
      'No Firebase ID token was passed as a Bearer token in the Authorization header.',
      'Make sure you authorize your request by providing the following HTTP header:',
      'Authorization: Bearer <Firebase ID Token>',
    );
    respond.unauthorized(res);
    return;
  }

  const idToken = authorization.split('Bearer ')[1];

  firebase
    .auth()
    .verifyIdToken(idToken)
    .then(decodedIdToken => {
      // TODO: should check that the user is NOT anonymous (if headerKey is "authorization")
      const provider = R.path(['firebase', 'sign_in_provider'], decodedIdToken);
      const isActualUser = provider && provider !== 'anonymous';

      if (headerKey !== 'authorization' || isActualUser) {
        log.info(
          `Authenticated with id=${decodedIdToken.user_id}, ${
            decodedIdToken.firebase.sign_in_provider
          }`,
        );
        req[propKey] = decodedIdToken;
        next();
      } else {
        throw new Error('Expected an actual user - not an anonymous user');
      }
    })
    .catch(error => {
      log.error('Error while verifying Firebase ID token:', error);
      respond.unauthorized(res);
    });
};

export const getUserId = R.path(['user', 'user_id']);

export const getAnonymousUserId = R.path(['anonymousUser', 'user_id']);
