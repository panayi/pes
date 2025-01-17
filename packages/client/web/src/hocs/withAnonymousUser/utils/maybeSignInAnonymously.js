const maybeSignInAnonymously = props => {
  const { isAuthenticating, isAuthenticated, firebase } = props;
  if (isAuthenticating || isAuthenticated) {
    return;
  }

  firebase.auth().signInAnonymously();
};

export default maybeSignInAnonymously;
