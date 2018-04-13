import nanoid from 'nanoid';
import log from '@pesposa/core/src/utils/log';
import { database } from '@pesposa/core/src/config/firebaseClient';
import * as betaInviteModel from '@pesposa/core/src/models/betaInvite';
import * as betaUserModel from '@pesposa/core/src/models/betaUser';
import * as respond from '@pesposa/core/src/utils/respond';
import { getUserId } from './utils';

const createBetaCodeAndUser = async (req, res) => {
  try {
    const betaOpenedSnaphot = await database.ref('/betaOpened').once('value');
    if (!betaOpenedSnaphot.exists() || !betaOpenedSnaphot.val()) {
      throw new Error('Beta closed');
    }

    const userId = getUserId(req);
    const code = nanoid();
    await betaInviteModel.create({ code });
    await betaUserModel.create(code, userId);
    res.send('OK');
  } catch (error) {
    log.error('Failed to create beta user');
    log.error(error);
    respond.internalServerError(res);
  }
};

export default createBetaCodeAndUser;
