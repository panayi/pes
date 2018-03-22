import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createStructuredSelector } from 'reselect';
import { withProps } from 'recompose';
import renderNothingWhen from 'hocs/renderNothingWhen';

const AdAddress = ({ address, render, children }) =>
  (children || render)({ address });

export default R.compose(
  withProps(
    createStructuredSelector({
      address: R.path(['ad', 'location', 'address', 'city']),
    }),
  ),
  renderNothingWhen(R.propSatisfies(isNilOrEmpty, 'address')),
)(AdAddress);
