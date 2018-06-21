import * as R from 'ramda';
import log from '@pesposa/core/src/utils/log';
import getClientIp from '@pesposa/core/src/utils/getClientIp';
import * as respond from '@pesposa/core/src/utils/respond';
import firebase from '@pesposa/server-core/src/config/firebaseClient';
import * as locationService from '@pesposa/server-core/src/services/location';
import server from '@pesposa/server-core/src/server';
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

    await server.users.update(
      firebase,
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
