import isBot from 'isbot';
import getClientIp from '@pesposa/core/src/utils/getClientIp';
import * as languageConfig from '@pesposa/core/src/config/language';
import { actions as userInfoActions } from '@pesposa/client-core/src/store/userInfo';
import * as api from '@pesposa/core/src/client/api';

const getLocation = async ip => {
  const response = await api.geoip({ ip });
  return response ? response.location : null;
};

const getLanguage = req => {
  const supportedLanguageIds = languageConfig.getAll();
  const defaultLanguage = languageConfig.getDefault();
  return req.acceptsLanguages(...supportedLanguageIds) || defaultLanguage;
};

const getIsBot = req => isBot(req.headers['user-agent']);

const setUserInfo = async (req, res, next) => {
  try {
    const { store } = res.locals;
    const ip = getClientIp(req);
    const location = await getLocation(ip);
    const language = getLanguage(req);
    const isUserBot = getIsBot(req);
    const userInfo = {
      ip,
      location,
      language,
      isBot: isUserBot,
      userAgent: req.useragent,
    };

    store.dispatch(userInfoActions.setUserInfo(userInfo));
  } catch (error) {
    console.error('Failed to set userInfo', error); // eslint-disable-line no-console
  }

  next();
};

export default setUserInfo;
