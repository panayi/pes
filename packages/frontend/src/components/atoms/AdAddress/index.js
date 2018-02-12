/* @flow */
import * as R from 'ramda';
import { withProps } from 'recompose';
import AdProp from '../AdProp';

export default withProps({ getProp: R.path(['location', 'address', 'city']) })(
  AdProp,
);
