import * as languageModel from '@pesposa/core/src/models/language';
import { actions as userInfoActions } from 'store/userInfo';

const setLanguage = (req, res, next) => {
  const { store } = res.locals;
  const supportedLanguageIds = languageModel.getAll();
  const defaultLanguage = languageModel.getDefault();
  const language =
    req.acceptsLanguages(...supportedLanguageIds) || defaultLanguage;

  store.dispatch(userInfoActions.setLanguage(language));
  next();
};

export default setLanguage;
