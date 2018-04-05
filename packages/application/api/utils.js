/* @flow */
import * as R from 'ramda';
import { auth } from '@pesposa/core/src/config/firebaseClient';
import log from '@pesposa/core/src/utils/log';
import * as respond from '@pesposa/core/src/utils/respond';

type Options = {
  headerKey?: string,
  propKey?: string,
};

// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header
// like this:
// `[headerKey]: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
export const isAuthenticated = (options: Options = {}) => (
  req: express$Request,
  res: express$Response,
  next: express$NextFunction,
) => {
  const { headerKey = 'authorization', propKey = 'user' } = options;
  const authorization: string | void = req.headers[headerKey];

  if (!authorization || !authorization.startsWith('Bearer ')) {
    log.error(
      'No Firebase ID token was passed as a Bearer token in the Authorization header.',
      'Make sure you authorize your request by providing the following HTTP header:',
      'Authorization: Bearer <Firebase ID Token>',
    );
    respond.unauthorized(res);
    return;
  }

  const idToken: string = authorization.split('Bearer ')[1];

  auth
    .verifyIdToken(idToken)
    .then(decodedIdToken => {
      // TODO: should check that the user is NOT anonymous (if headerKey is "authorization")
      log.info(`Authenticated with id=${decodedIdToken.user_id}, ${decodedIdToken.firebase.sign_in_provider}`);
      req[propKey] = decodedIdToken;
      next();
    })
    .catch(error => {
      log.error('Error while verifying Firebase ID token:', error);
      respond.unauthorized(res);
    });
};

export const getUserId: (req: express$Request) => string = R.path([
  'user',
  'user_id',
]);

export const getAnonymousUserId: (req: express$Request) => string = R.path([
  'anonymousUser',
  'user_id',
]);
