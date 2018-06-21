import * as R from 'ramda';
import { lifecycle } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { selectors as authSelectors } from '@pesposa/client-core/src/store/firebase/auth';
import maybeSignInAnonymously from './utils/maybeSignInAnonymously';

export const withAnonymousUser = lifecycle({
  componentDidMount() {
    maybeSignInAnonymously(this.props);
  },
  componentDidUpdate() {
    maybeSignInAnonymously(this.props);
  },
});

const mapStateToProps = createStructuredSelector({
  isAuthenticating: authSelectors.isAuthenticatingSelector,
  isAuthenticated: authSelectors.isAuthenticatedSelector,
});

export default R.compose(
  firebaseConnect(),
  connect(mapStateToProps),
  withAnonymousUser,
);
