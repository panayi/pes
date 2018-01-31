import * as R from 'ramda';
import { withProps, setDisplayName } from 'recompose';
import { isNilOrEmpty, isPositive } from 'ramda-adjunct';
import renderNothingWhen from 'components/hocs/renderNothingWhen';
import AdProp from '../AdProp';

const getPrice = R.prop('price');

export default R.compose(
  renderNothingWhen(
    R.compose(R.complement(isPositive), getPrice, R.prop('ad')),
  ),
  withProps({
    getProp: R.compose(
      R.unless(isNilOrEmpty, R.concat('€ ')),
      R.toString,
      getPrice,
    ),
  }),
  setDisplayName('AdPrice'),
)(AdProp);
