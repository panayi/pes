import * as R from 'ramda';
import { auth } from 'lib/firebaseClient';
import * as respond from 'utils/respond';

// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header
// like this:
// `[headerKey]: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
export const isAuthenticated = (options = {}) => (req, res, next) => {
  const { headerKey = 'authorization', propKey = 'user' } = options;
  const authorization = req.headers[headerKey];

  if (!authorization || !authorization.startsWith('Bearer ')) {
    console.error(
      'No Firebase ID token was passed as a Bearer token in the Authorization header.',
      'Make sure you authorize your request by providing the following HTTP header:',
      'Authorization: Bearer <Firebase ID Token>',
    );
    respond.unauthorized(res);
    return;
  }

  const idToken = authorization.split('Bearer ')[1];

  auth
    .verifyIdToken(idToken)
    .then(decodedIdToken => {
      console.log(`Authenticated with id=${decodedIdToken.user_id}`);
      req[propKey] = decodedIdToken;
      next();
    })
    .catch(error => {
      console.error('Error while verifying Firebase ID token:', error);
      respond.unauthorized(res);
    });
};

// getUserId :: Request -> String | Null
export const getUserId = R.path(['user', 'user_id']);

// getAnonymousUserId :: Request -> String | Null
export const getAnonymousUserId = R.path(['anonymousUser', 'user_id']);
