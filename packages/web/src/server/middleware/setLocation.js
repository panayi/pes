import { actions as userInfoActions } from 'store/userInfo';
import api from 'services/api';

const setLocation = async (req, res, next) => {
  const { store } = res.locals;
  const response = await api.geoip()();

  if (response && response.location) {
    store.dispatch(userInfoActions.setLocation(response.location));
  }

  next();
};

export default setLocation;
