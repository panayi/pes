/* @flow */
import * as R from 'ramda';
import { noop } from 'ramda-adjunct';
import { connect } from 'react-redux';
import { defaultProps, withProps } from 'recompose';
import { actions as authActions } from 'store/firebase/auth';

const mapDispatchToProps = {
  login: authActions.login,
};

export default R.compose(
  connect(null, mapDispatchToProps),
  defaultProps({
    onSuccess: noop,
    onError: noop,
  }),
  withProps(({ login, onSuccess, onError }) => ({
    login: (...args) =>
      login(...args)
        .then(onSuccess)
        .catch(onError),
  })),
);
