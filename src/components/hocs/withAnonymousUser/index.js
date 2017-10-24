import * as R from 'ramda';
import { lifecycle } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { isAuthenticatingSelector, isAuthenticatedSelector } from 'store/auth/selectors';
import maybeSignInAnonymously from './utils/maybeSignInAnonymously';

export const withAnonymousUser = lifecycle({
  componentDidMount() {
    maybeSignInAnonymously(this.props);
  },
  componentWillReceiveProps(nextProps) {
    maybeSignInAnonymously(nextProps);
  },
});

const mapStateToProps = createStructuredSelector({
  isAuthenticating: isAuthenticatingSelector,
  isAuthenticated: isAuthenticatedSelector,
});

export default R.compose(
  firebaseConnect(),
  connect(mapStateToProps),
  withAnonymousUser,
);
