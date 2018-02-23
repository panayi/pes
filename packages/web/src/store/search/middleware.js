import * as R from 'ramda';
import { wrapDispatch } from 'multireducer';
import * as actions from './actions';
import * as utils from './utils';

const middleWare = R.curry((store, next, action) => {
  const { type } = action;
  next(action);

  if (utils.isSearchParamsAction(type)) {
    const searchId = R.path(['meta', '__multireducerKey'], action);
    const wrappedDispatch = wrapDispatch(store.dispatch, searchId);
    wrappedDispatch(actions.loadFirstPage());
  }
});

export default middleWare;
