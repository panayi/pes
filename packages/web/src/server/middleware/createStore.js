import createMemoryHistory from 'history/createMemoryHistory';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import configureStore from 'store/configureStore';

const createStore = async (req, res, next) => {
  const store = configureStore({}, createMemoryHistory());

  await store.firebase.promiseEvents([
    { path: modelPaths.BETA_USERS.string, type: 'once' },
  ]);

  res.locals.store = store;
  next();
};

export default createStore;
