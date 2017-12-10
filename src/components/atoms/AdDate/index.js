import * as R from 'ramda';
import relativeDate from 'relative-date';
import { isNilOrEmpty } from 'ramda-adjunct';
import { withProps } from 'recompose';
import AdProp from '../AdProp';

export default withProps({
  getProp: R.compose(R.unless(isNilOrEmpty, relativeDate), R.prop('createdAt')),
})(AdProp);
