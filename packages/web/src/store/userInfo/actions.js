import { createAction } from 'redux-actions';
import * as navigatorService from 'services/navigator';
import api from 'services/api';
import * as types from './types';

export const setIp = createAction(types.SET_IP);

export const setLocation = createAction(types.SET_LOCATION);

export const setLanguage = createAction(types.SET_LANGUAGE);

export const setIsBot = createAction(types.SET_IS_BOT);

export const setUserInfo = createAction(types.SET_USER_INFO);

export const getCurrentLocation = () => async dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const geoposition = await navigatorService.getCurrentPosition();
      const response = await dispatch(api.reverseGeocode({ geoposition }));

      if (response && response.location) {
        dispatch(setLocation(response.location));
      }
      resolve();
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
      reject();
    }
  });
