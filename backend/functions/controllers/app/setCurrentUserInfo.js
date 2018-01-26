import requestIp from 'request-ip';
import * as userModel from '../../models/user';
import { getUserId } from './utils';

const setCurrentUserInfo = async (req, res, next) => {
  try {
    const { geoposition } = req.body;
    const locales = req.acceptsLanguages();
    const userId = getUserId(req);
    const ip = requestIp.getClientIp(req);

    await userModel.setInfo({ geoposition, ip, locales }, userId);
    res.send('OK');
    next();
  } catch (error) {
    console.error('Failed to set IP of user', error);
    res.status(500).send('Internal Server Error');
  }
};

export default setCurrentUserInfo;
