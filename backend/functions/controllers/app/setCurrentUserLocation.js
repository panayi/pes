import requestIp from 'request-ip';
import * as userModel from '../../models/user';
import { getUserId } from './utils';

const setCurrentUserLocation = async (req, res, next) => {
  try {
    const { geoposition } = req.body;
    const userId = getUserId(req);
    const ip = requestIp.getClientIp(req);

    await userModel.setLocation({ geoposition, ip }, userId);
    res.send('OK');
    next();
  } catch (error) {
    console.error('Failed to set IP of user', error);
    res.status(500).send('Internal Server Error');
  }
};

export default setCurrentUserLocation;
