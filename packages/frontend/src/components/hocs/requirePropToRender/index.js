import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import renderNothingWhen from '../renderNothingWhen';

export default propKey =>
  renderNothingWhen(R.compose(isNilOrEmpty, R.prop(propKey)));
