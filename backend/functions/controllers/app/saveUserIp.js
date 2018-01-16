import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import * as userModel from '../../models/user';

const saveUserIp = async (req, res, next) => {
  const { userId } = req.params;

  if (isNilOrEmpty(userId) || userId !== R.path(['user', 'user_id'], req)) {
    res.status(403).send('Unauthorized');
    return;
  }

  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  try {
    await userModel.setIp(ip, userId);
    res.send('OK');
    next();
  } catch (error) {
    console.error('Failed to set IP of user', error);
    res.status(500).send('Internal Server Error');
  }
};

export default saveUserIp;
