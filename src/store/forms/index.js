import * as R from 'ramda';
import reducer from './reducer';
import * as constants from './constants';
import * as models from './models';

export default reducer;

const finalModels = R.map(
  model => R.assoc('path', `${constants.FORMS_PATH}.${model.key}`, model),
  models,
);

export { finalModels as models };
