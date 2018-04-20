/* @flow */
import log from '@pesposa/core/src/utils/log';
import * as userModel from '@pesposa/core/src/models/user';
import * as respond from '@pesposa/core/src/utils/respond';
import { getUserId, getAnonymousUserId } from './utils';

const migrateAnonymousUser = async (
  req: express$Request,
  res: express$Response,
) => {
  try {
    const userId: ID = getUserId(req);
    const anonymousUserId: ID = getAnonymousUserId(req);

    await userModel.migrateAnonymousUser(anonymousUserId, userId);

    res.send('OK');
  } catch (error) {
    log.error('Failed to migrate anonymous user');
    log.error(error);
    respond.internalServerError(res);
  }
};

export default migrateAnonymousUser;
