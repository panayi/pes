/* @flow */
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { withContext } from 'recompose';
import { actions as authActions } from 'store/auth';

const Login = ({ children }) => children;

Login.propTypes = {
  children: PropTypes.node,
};

const mapDispatchToProps = {
  login: authActions.login,
};

export default R.compose(
  connect(null, mapDispatchToProps),
  withContext(
    {
      login: PropTypes.func.isRequired,
      onSuccess: PropTypes.func,
      onError: PropTypes.func,
    },
    ({ login, onSuccess, onError }) => ({
      login: credentials =>
        login(credentials)
          .then(onSuccess)
          .catch(onError),
      onSuccess,
      onError,
    }),
  ),
)(Login);
