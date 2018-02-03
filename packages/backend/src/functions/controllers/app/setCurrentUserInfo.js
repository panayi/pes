/* @flow */
import requestIp from 'request-ip';
import * as respond from 'utils/respond';
import * as userModel from 'functions/models/user';
import { getUserId } from './utils';

const setCurrentUserInfo = async (
  req: express$Request,
  res: express$Response,
  next: express$NextFunction,
) => {
  try {
    const { geoposition }: { geoposition: Geoposition } = req.body;
    const locales = req.acceptsLanguages();
    const userId: ID = getUserId(req);
    const ip: IP = requestIp.getClientIp(req);

    await userModel.setInfo({ geoposition, ip, locales }, userId);
    res.send('OK');
    next();
  } catch (error) {
    console.error('Failed to set IP of user', error);
    respond.internalServerError(res);
  }
};

export default setCurrentUserInfo;
