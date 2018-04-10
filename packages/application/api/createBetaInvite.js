import * as R from 'ramda';
import log from '@pesposa/core/src/utils/log';
import * as betaInviteModel from '@pesposa/core/src/models/betaInvite';
import * as respond from '@pesposa/core/src/utils/respond';

const createBetaUser = async (req, res) => {
  try {
    const email = R.path(['reservation', 'email'], req.body);
    await betaInviteModel.create(email);
    res.send('OK');
  } catch (error) {
    log.error('Failed to create beta invite');
    log.error(error);
    respond.internalServerError(res);
  }
};

export default createBetaUser;
