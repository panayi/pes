/* @flow */
import React from 'react';
import * as R from 'ramda';
import relativeDate from 'relative-date';
import { isNilOrEmpty } from 'ramda-adjunct';
import { mapProps, branch, renderNothing } from 'recompose';
import Typography from 'material-ui/Typography';

type Props = {
  ad: Ad,
  date: string,
};

const AdDate = ({ date, ...rest }: Props) => (
  <Typography {...rest}>{date}</Typography>
);

export default R.compose(
  mapProps(({ ad, ...rest }) => ({
    date: R.compose(R.unless(isNilOrEmpty, relativeDate), R.prop('createdAt'))(
      ad,
    ),
    ...rest,
  })),
  branch(
    R.compose(R.either(isNilOrEmpty, R.lte(R.__, 0)), R.prop('date')),
    renderNothing,
  ),
)(AdDate);
