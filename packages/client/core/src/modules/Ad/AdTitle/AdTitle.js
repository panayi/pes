import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createStructuredSelector } from 'reselect';
import { withProps } from 'recompose';
import Typography from '@material-ui/core/Typography';
import omitProps from '../../../utils/omitProps';
import renderNothingWhen from '../../../hocs/renderNothingWhen';

const AdTitle = ({ title, ...rest }) => (
  <Typography {...rest}>{title}</Typography>
);

export default R.compose(
  withProps(
    createStructuredSelector({
      title: R.path(['ad', 'title']),
    }),
  ),
  omitProps(['ad']),
  renderNothingWhen(R.propSatisfies(isNilOrEmpty, 'title')),
)(AdTitle);
