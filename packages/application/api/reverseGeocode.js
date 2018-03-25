import * as locationService from '@pesposa/core/src/services/location';
import * as respond from '@pesposa/core/src/utils/respond';

const reverseGeocode = async (req, res) => {
  const { geoposition } = req.body;

  try {
    const location = await locationService.getFromGeoposition(geoposition);
    res.json({ location });
  } catch (error) {
    respond.internalServerError(res, error);
  }
};

export default reverseGeocode;
