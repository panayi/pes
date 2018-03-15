import { Children } from 'react';
import * as R from 'ramda';
import { lifecycle } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { withFirebase } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { models } from 'store/firebase/data';
import { selectors as authSelectors } from 'store/firebase/auth';

// TODO: we are manually setting up a listener due to a react-redux-firebase bug (?)
// that unsets listener on Messenger page enter
// See:
// https://github.com/prescottprue/react-redux-firebase/issues/423
// https://github.com/prescottprue/react-redux-firebase/issues/368

const WithConversations = ({ children }) => Children.only(children);

const mapStateToProps = createStructuredSelector({
  conversationsQueryPath: models.conversations.all.query,
  isAuthenticated: authSelectors.isAuthenticatedSelector,
});

const watchConversations = props => {
  const { firebase, conversationsQueryPath } = props;
  firebase.watchEvent('value', conversationsQueryPath);
};

export default R.compose(
  connect(mapStateToProps),
  withFirebase,
  lifecycle({
    componentWillMount() {
      if (this.props.isAuthenticated) {
        watchConversations(this.props);
        this.listening = true;
      }
    },
    componentWillReceiveProps(nextProps) {
      if (!this.listening && nextProps.isAuthenticated) {
        watchConversations(nextProps);
        this.listening = true;
      }
    },
  }),
)(WithConversations);
