/* @flow */
import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { mapProps, branch, renderNothing } from 'recompose';
import Typography from 'material-ui/Typography';

type Props = {
  ad: Ad,
  address: string,
};

const AdAddress = ({ address, ...rest }: Props) => (
  <Typography {...rest}>{address}</Typography>
);

export default R.compose(
  mapProps(({ ad, ...rest }) => ({
    address: R.prop('address', ad),
    ...rest,
  })),
  branch(
    R.compose(R.either(isNilOrEmpty, R.lte(R.__, 0)), R.prop('address')),
    renderNothing,
  ),
)(AdAddress);
