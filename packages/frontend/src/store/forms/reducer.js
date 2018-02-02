import * as R from 'ramda';
import * as models from './models';

export default R.compose(
  R.reduce((acc, model) => R.assoc(model.key, model.initialState, acc), []),
  R.values,
)(models);
