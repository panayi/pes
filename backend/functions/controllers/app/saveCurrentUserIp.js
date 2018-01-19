import { isNilOrEmpty } from 'ramda-adjunct';
import requestIp from 'request-ip';
import * as userModel from '../../models/user';
import { getUserId } from './utils';

const saveCurrentUserIp = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const ip = requestIp.getClientIp(req);

    if (isNilOrEmpty(ip)) {
      throw new Error('Failed to retrieve IP');
    }

    await userModel.setIpAndGeopositionFromIp(ip, userId);
    res.send('OK');
    next();
  } catch (error) {
    console.error('Failed to set IP of user', error);
    res.status(500).send('Internal Server Error');
  }
};

export default saveCurrentUserIp;
