import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import qs from 'querystringify';
import { withProps } from 'recompose';
import Join from './join';
import Login from './login';

const OldBeta = props =>
  props.hasBetaInviteCode ? <Login {...props} /> : <Join {...props} />;

export default R.compose(
  withProps(props => {
    const search = R.pathOr('', ['location', 'search'], props);
    const params = qs.parse(search);
    const hasBetaInviteCode = !isNilOrEmpty(params.code);
    return {
      hasBetaInviteCode,
    };
  }),
)(OldBeta);
