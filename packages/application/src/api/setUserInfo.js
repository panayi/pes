import * as R from 'ramda';
import log from '@pesposa/core/src/utils/log';
import getClientIp from '@pesposa/core/src/utils/getClientIp';
import * as respond from '@pesposa/core/src/utils/respond';
import * as locationService from '@pesposa/core/src/services/location';
import * as userModel from '@pesposa/core/src/models/user';
import { getUserId } from './utils';

const setUserInfo = async (req, res) => {
  try {
    const userId = getUserId(req);
    const ip = getClientIp(req);
    const location = locationService.getFromIp(ip, req);
    const countryCode = R.path(['address', 'country', 'cca2'], location);
    const finalLocation = R.assocPath(
      ['address', 'country'],
      countryCode,
      location,
    );

    await userModel.update(
      {
        ip,
        location: finalLocation,
      },
      userId,
    );

    res.send('OK');
  } catch (error) {
    log.error(error);
    respond.internalServerError(res);
  }
};

export default setUserInfo;
