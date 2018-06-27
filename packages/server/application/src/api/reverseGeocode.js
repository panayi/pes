import { isNilOrEmpty } from 'ramda-adjunct';
import log from '@pesposa/core/src/utils/log';
import * as locationService from '@pesposa/server-core/src/services/location';
import * as respond from '@pesposa/core/src/utils/respond';

const reverseGeocode = async (req, res) => {
  try {
    const { geoposition } = req.body;
    const location = await locationService.getFromGeoposition(geoposition);

    if (isNilOrEmpty(location)) {
      log.error(
        `No reverse-geocode results for ${JSON.stringify(geoposition)}`,
      );
    }

    res.json({ location });
  } catch (error) {
    log.error('/api/reverse-geocode failed');
    log.error(error);
    respond.internalServerError(res, error);
  }
};

export default reverseGeocode;
