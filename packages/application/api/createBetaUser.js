import log from '@pesposa/core/src/utils/log';
import * as betaUserModel from '@pesposa/core/src/models/betaUser';
import * as respond from '@pesposa/core/src/utils/respond';
import { getUserId } from './utils';

const createBetaUser = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { code, email } = req.body;
    await betaUserModel.create({ code, email }, userId);
    res.send('OK');
  } catch (error) {
    log.error('Failed to create beta user');
    log.error(error);
    respond.internalServerError(res);
  }
};

export default createBetaUser;
