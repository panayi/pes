import React from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { isPositive } from 'ramda-adjunct';
import renderNothingWhen from '../../../hocs/renderNothingWhen';
import Currency from '../../../components/Currency/Currency';

const AdPrice = ({ price, noDecimals, render, children }) =>
  (children || render)({
    price: price ? <Currency value={price} noDecimals={noDecimals} /> : null,
  });

export default R.compose(
  withProps(
    createStructuredSelector({
      price: R.path(['ad', 'price']),
    }),
  ),
  renderNothingWhen(
    R.compose(
      R.complement(isPositive),
      R.prop('price'),
    ),
  ),
)(AdPrice);
