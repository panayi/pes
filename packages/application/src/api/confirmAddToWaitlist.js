import * as R from 'ramda';
import { renameKeys } from 'ramda-adjunct';
import log from '@pesposa/core/src/utils/log';
import * as respond from '@pesposa/core/src/utils/respond';
import sendWaitingListConfirmationEmail from '../emails/waitingListConfirmation';

const confirmAddToWaitlist = async (req, res) => {
  try {
    const reservation = R.compose(
      renameKeys({ activation_code: 'code' }),
      R.prop('reservation'),
    )(req.body);
    await sendWaitingListConfirmationEmail(reservation);
    res.send('OK');
  } catch (error) {
    log.error('Failed to send waiting-list confirmation email');
    log.error(error);
    respond.internalServerError(res);
  }
};

export default confirmAddToWaitlist;
