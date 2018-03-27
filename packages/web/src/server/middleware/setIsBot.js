import isBot from 'isbot';
import { actions as userInfoActions } from 'store/userInfo';

const setIsBot = (req, res, next) => {
  const { store } = res.locals;
  store.dispatch(userInfoActions.setIsBot(isBot(req.headers['user-agent'])));
  next();
};

export default setIsBot;
