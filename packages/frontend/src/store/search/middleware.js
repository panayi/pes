import * as R from 'ramda';
import * as actions from './actions';
import * as utils from './utils';

const middleWare = R.curry((store, next, action) => {
  const { type } = action;
  next(action);

  if (utils.isSearchParamsAction(type)) {
    store.dispatch(actions.loadFirstPage());
  }
});

export default middleWare;
