import * as R from 'ramda';
import { withProps, setDisplayName } from 'recompose';
import { isNilOrEmpty } from 'ramda-adjunct';
import renderNothingWhen from 'components/hocs/renderNothingWhen';
import AdProp from '../AdProp';

const getPrice = R.prop('price');

export default R.compose(
  renderNothingWhen(R.compose(R.lte(R.__, 0), getPrice)),
  withProps({
    getProp: R.compose(
      R.unless(isNilOrEmpty, R.prepend('€ ')),
      R.toString,
      getPrice,
    ),
  }),
  setDisplayName('AdPrice'),
)(AdProp);
