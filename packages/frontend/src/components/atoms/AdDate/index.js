import React from 'react';
import * as R from 'ramda';
import TimeAgo from 'react-timeago';
import { isNilOrEmpty } from 'ramda-adjunct';
import { withProps } from 'recompose';
import AdProp from '../AdProp';

export default withProps({
  getProp: R.compose(
    R.unless(isNilOrEmpty, date => <TimeAgo date={date} />),
    R.prop('createdAt'),
  ),
})(AdProp);
