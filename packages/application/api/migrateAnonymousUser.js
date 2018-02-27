/* @flow */
import log from '@pesposa/core/src/utils/log';
import * as userModel from '@pesposa/core/src/models/user';
import * as respond from '../utils/respond';
import { getUserId, getAnonymousUserId } from './utils';

const migrateAnonymousUser = async (
  req: express$Request,
  res: express$Response,
  next: express$NextFunction,
) => {
  try {
    const userId: ID = getUserId(req);
    const anonymousUserId: ID = getAnonymousUserId(req);

    await userModel.migrateAnonymousUser(anonymousUserId, userId);

    res.send('OK');
    next();
  } catch (error) {
    log.error('Failed to migrate anonymous user', error);
    respond.internalServerError(res);
  }
};

export default migrateAnonymousUser;
