import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createStructuredSelector } from 'reselect';
import { withProps } from 'recompose';
import TimeAgo from 'react-timeago';
import renderNothingWhen from '../../../hocs/renderNothingWhen';

const AdDate = ({ date, render, children }) =>
  (children || render)({ date: <TimeAgo date={date} title={date} /> });

// eslint-disable-next-line no-restricted-properties
const isValidDate = date => date instanceof Date && global.isFinite(date);

export default R.compose(
  withProps(
    createStructuredSelector({
      date: R.compose(
        R.unless(isValidDate, R.always(null)),
        timestamp => new Date(timestamp),
        R.path(['ad', 'createdAt']),
      ),
    }),
  ),
  renderNothingWhen(R.propSatisfies(isNilOrEmpty, 'date')),
)(AdDate);
