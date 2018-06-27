import log from '@pesposa/core/src/utils/log';
import * as respond from '@pesposa/core/src/utils/respond';
import firebase from '@pesposa/server-core/src/config/firebaseClient';
import server from '@pesposa/server-core/src/server';
import { getUserId, getAnonymousUserId } from './utils';

const migrateAnonymousUser = async (req, res) => {
  try {
    const userId = getUserId(req);
    const anonymousUserId = getAnonymousUserId(req);

    await server.users.migrateAnonymousUser(firebase, anonymousUserId, userId);

    res.send('OK');
  } catch (error) {
    log.error('/api/users/migrate failed');
    log.error(error);
    respond.internalServerError(res);
  }
};

export default migrateAnonymousUser;
