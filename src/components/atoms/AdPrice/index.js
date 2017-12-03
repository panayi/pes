/* @flow */
import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { mapProps, branch, renderNothing } from 'recompose';
import Typography from 'material-ui/Typography';

type Props = {
  ad: Ad,
  price: string,
};

const AdPrice = ({ price, ...rest }: Props) => (
  <Typography {...rest}>€&nbsp;{price}</Typography>
);

export default R.compose(
  mapProps(({ ad, ...rest }) => ({
    price: R.prop('price', ad),
    ...rest,
  })),
  branch(
    R.compose(R.either(isNilOrEmpty, R.lte(R.__, 0)), R.prop('price')),
    renderNothing,
  ),
)(AdPrice);
