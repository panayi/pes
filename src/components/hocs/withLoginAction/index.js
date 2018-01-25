/* @flow */
import * as R from 'ramda';
import { connect } from 'react-redux';
import { defaultProps, withProps } from 'recompose';
import noop from 'utils/noop';
import { actions as authActions } from 'store/auth';

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
