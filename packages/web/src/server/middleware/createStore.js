import createMemoryHistory from 'history/createMemoryHistory';
import configureStore from 'store/configureStore';

const createStore = (req, res, next) => {
  const store = configureStore({}, createMemoryHistory());

  res.locals.store = store;
  next();
};

export default createStore;
