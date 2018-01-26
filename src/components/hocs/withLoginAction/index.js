/* @flow */
import * as R from 'ramda';
import { noop } from 'ramda-adjunct';
import { connect } from 'react-redux';
import { defaultProps, withProps } from 'recompose';
import { actions as loginActions } from 'store/login';

const mapDispatchToProps = {
  login: loginActions.login,
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
