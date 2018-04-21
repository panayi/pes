import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createStructuredSelector } from 'reselect';
import { withProps } from 'recompose';
import Typography from 'material-ui/Typography';
import renderNothingWhen from 'hocs/renderNothingWhen';
import Truncate from 'components/Truncate/Truncate';

const AdTitle = ({ title, truncate, ...rest }) => {
  const komponent = truncate ? Truncate : null;

  return (
    <Typography {...rest} component={komponent}>
      {title}
    </Typography>
  );
};

export default R.compose(
  withProps(
    createStructuredSelector({
      title: R.path(['ad', 'title']),
    }),
  ),
  renderNothingWhen(R.propSatisfies(isNilOrEmpty, 'title')),
)(AdTitle);
