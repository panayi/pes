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
    console.log('Failed to setLocation', error);
  }

  next();
};

export default setLocation;
