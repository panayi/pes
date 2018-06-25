import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import renderNothingWhen from '../renderNothingWhen';

const requirePropToRender = propKey =>
  renderNothingWhen(
    R.compose(
      isNilOrEmpty,
      R.prop(propKey),
    ),
  );

export default requirePropToRender;
