import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createStructuredSelector } from 'reselect';
import { withProps } from 'recompose';
import TimeAgo from 'react-timeago';
import renderNothingWhen from 'hocs/renderNothingWhen';

const AdDate = ({ date, render, children }) =>
  (children || render)({ date: <TimeAgo date={date} /> });

export default R.compose(
  withProps(
    createStructuredSelector({
      date: R.path(['ad', 'createdAt']),
    }),
  ),
  renderNothingWhen(R.propSatisfies(isNilOrEmpty, 'date')),
)(AdDate);
