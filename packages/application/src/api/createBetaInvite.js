import * as R from 'ramda';
import { renameKeys } from 'ramda-adjunct';
import log from '@pesposa/core/src/utils/log';
import * as betaInviteModel from '@pesposa/core/src/models/betaInvite';
import * as respond from '@pesposa/core/src/utils/respond';

const createBetaUser = async (req, res) => {
  try {
    const reservation = R.compose(
      renameKeys({ activation_code: 'code' }),
      R.prop('reservation'),
    )(req.body);
    await betaInviteModel.create(reservation);
    res.send('OK');
  } catch (error) {
    log.error('Failed to create beta invite');
    log.error(error);
    respond.internalServerError(res);
  }
};

export default createBetaUser;
