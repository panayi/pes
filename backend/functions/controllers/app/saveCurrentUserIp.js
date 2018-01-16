import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import * as userModel from '../../models/user';

const saveCurrentUserIp = async (req, res, next) => {
  const userId = R.path(['user', 'user_id'], req);

  if (isNilOrEmpty(userId)) {
    res.status(403).send('Unauthorized');
    return;
  }

  const anonymous = R.pathEq(['user', 'provider_id'], 'anonymous', req);
  const ip = R.either(
    R.path(['headers', 'x-forwarded-for']),
    R.path(['connection', 'remoteAddress']),
  )(req);

  try {
    await userModel.setIp(ip, userId, { anonymous });
    res.send('OK');
    next();
  } catch (error) {
    console.error('Failed to set IP of user', error);
    res.status(500).send('Internal Server Error');
  }
};

export default saveCurrentUserIp;
