import * as R from 'ramda';
import renderHtml from 'react-render-html';
import { withProps } from 'recompose';
import AdProp from '../AdProp/AdProp';

export default withProps({
  getProp: R.ifElse(
    R.prop('isLegacy'),
    R.compose(
      renderHtml,
      R.prop('body'),
    ),
    R.prop('body'),
  ),
})(AdProp);
