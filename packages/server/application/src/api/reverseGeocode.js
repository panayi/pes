import * as locationService from '@pesposa/server-core/src/services/location';
import * as respond from '@pesposa/core/src/utils/respond';

const reverseGeocode = async (req, res) => {
  try {
    const { geoposition } = req.body;
    const location = await locationService.getFromGeoposition(geoposition);
    res.json({ location });
  } catch (error) {
    respond.internalServerError(res, error);
  }
};

export default reverseGeocode;
