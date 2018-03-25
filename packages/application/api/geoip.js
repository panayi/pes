import * as locationService from '@pesposa/core/src/services/location';
import * as respond from '@pesposa/core/src/utils/respond';

const geoip = (req, res) => {
  try {
    const location = locationService.getFromIp(req);
    res.json({ location });
  } catch (error) {
    respond.internalServerError(res, error);
  }
};

export default geoip;
