import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import log from '@pesposa/core/src/utils/log';
import * as locationService from '@pesposa/server-core/src/services/location';
import * as respond from '@pesposa/core/src/utils/respond';

const geoip = (req, res) => {
  try {
    const { ip } = req.body;
    const location = locationService.getFromIp(ip, req);
    const geoposition = R.prop('geoposition', location);
    const address = R.prop('address', location);

    if (isNilOrEmpty(geoposition)) {
      log.error(`No geoposition returned for IP=${ip}`);
    }
    if (isNilOrEmpty(address)) {
      log.error(`No address returned for IP=${ip}`);
    }

    res.json({ location });
  } catch (error) {
    log.error('/api/geoip failed');
    log.error(error);
    respond.internalServerError(res, error);
  }
};

export default geoip;
