/* @flow */
import * as respond from 'utils/respond';
import * as userModel from 'functions/models/user';
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
    console.error('Failed to migrate anonymous user', error);
    respond.internalServerError(res);
  }
};

export default migrateAnonymousUser;
