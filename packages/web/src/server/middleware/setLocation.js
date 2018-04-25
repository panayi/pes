import getClientIp from '@pesposa/core/src/utils/getClientIp';
import * as locationService from '@pesposa/core/src/services/location';
import { actions as userInfoActions } from 'store/userInfo';
// import api from 'services/api';

const setLocation = async (req, res, next) => {
  try {
    const { store } = res.locals;
    const ip = getClientIp(req);
    const response = locationService.getFromIp(ip, req);

    if (response && response.location) {
      store.dispatch(userInfoActions.setLocation(response.location));
    }
  } catch (error) {
    console.error('Failed to setLocation', error); // eslint-disable-line no-console
  }

  next();
};

export default setLocation;
