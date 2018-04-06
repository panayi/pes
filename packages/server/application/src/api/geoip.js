import * as locationService from '@pesposa/server-core/src/services/location';
import * as respond from '@pesposa/core/src/utils/respond';

const geoip = (req, res) => {
  try {
    const { ip } = req.body;
    const location = locationService.getFromIp(ip, req);
    res.json({ location });
  } catch (error) {
    respond.internalServerError(res, error);
  }
};

export default geoip;
