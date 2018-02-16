/* @flow */
import * as R from 'ramda';
import { withProps } from 'recompose';
import AdProp from '../AdProp/AdProp';

export default withProps({ getProp: R.prop('title') })(AdProp);
