/* @flow */
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { getContext } from 'recompose';

export default R.compose(
  getContext({
    login: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
  }),
);
