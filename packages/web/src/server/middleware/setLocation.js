import { actions as userInfoActions } from 'store/userInfo';
import api from 'services/api';

const setLocation = async (req, res, next) => {
  try {
    const { store } = res.locals;
    const response = await api.geoip()();

    if (response && response.location) {
      store.dispatch(userInfoActions.setLocation(response.location));
    }
  } catch (error) {
    console.error('Failed to setLocation', error); // eslint-disable-line no-console
  }

  next();
};

export default setLocation;
