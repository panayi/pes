/* @flow */
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withContext } from 'recompose';
import { firebaseConnect } from 'react-redux-firebase';

const Login = ({ children }) => children;

Login.propTypes = {
  children: PropTypes.node,
};

export default R.compose(
  firebaseConnect(),
  withContext(
    {
      login: PropTypes.func.isRequired,
      onSuccess: PropTypes.func,
      onError: PropTypes.func,
    },
    ({ firebase, onSuccess, onError }) => ({
      login: (...args) =>
        firebase
          .login(...args)
          .then(onSuccess)
          .catch(onError),
      onSuccess,
      onError,
    }),
  ),
)(Login);
