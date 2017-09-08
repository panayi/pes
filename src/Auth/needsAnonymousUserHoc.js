import R from 'ramda';
import { lifecycle } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { isAuthenticatingSelector, isAuthenticatedSelector } from './auth';

const maybeSignInAnonymously = (props) => {
  const { isAuthenticating, isAuthenticated, firebase } = props;
  if (isAuthenticating || isAuthenticated) {
    return;
  }

  firebase.auth().signInAnonymously();
};

const mapStateToProps = createStructuredSelector({
  isAuthenticating: isAuthenticatingSelector,
  isAuthenticated: isAuthenticatedSelector,
});

export default R.compose(
  firebaseConnect(),
  connect(mapStateToProps),
  lifecycle({
    componentDidMount() {
      maybeSignInAnonymously(this.props);
    },
    componentWillReceiveProps(nextProps) {
      maybeSignInAnonymously(nextProps);
    },
  }),
);
