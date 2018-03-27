import { createAction } from 'redux-actions';
import zipArgs from '@pesposa/core/src/utils/zipArgs';
import * as navigatorService from 'services/navigator';
import api from 'services/api';
import * as types from './types';
import * as constants from './constants';

export const setLocation = createAction(types.SET_LOCATION);

export const setLanguage = createAction(types.SET_LANGUAGE);

export const setUserInfo = createAction(
  types.SET_USER_INFO,
  zipArgs([constants.LOCATION_KEY, constants.LANGUAGE_KEY]),
);

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
