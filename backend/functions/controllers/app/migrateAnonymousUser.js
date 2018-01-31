import * as respond from '../../../utils/respond';
import * as userModel from '../../models/user';
import { getUserId, getAnonymousUserId } from './utils';

const migrateAnonymousUser = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const anonymousUserId = getAnonymousUserId(req);

    await userModel.migrateAnonymousUser(anonymousUserId, userId);

    res.send('OK');
    next();
  } catch (error) {
    console.error('Failed to migrate anonymous user', error);
    respond.internalServerError(res);
  }
};

export default migrateAnonymousUser;
