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
    res.status(500).send('Internal Server Error');
  }
};

export default migrateAnonymousUser;
