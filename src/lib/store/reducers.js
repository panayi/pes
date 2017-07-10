import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export const makeRootReducer = asyncReducers =>
  combineReducers({
    router: routerReducer,
    ...asyncReducers,
  });

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) {
    return;
  }

  store.asyncReducers[key] = reducer; // eslint-disable-line no-param-reassign
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
