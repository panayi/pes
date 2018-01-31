import requestIp from 'request-ip';
import * as respond from '../../../utils/respond';
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
    respond.internalServerError(res);
  }
};

export default setCurrentUserInfo;
