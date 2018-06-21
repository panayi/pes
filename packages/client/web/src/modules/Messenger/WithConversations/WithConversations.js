import { Children } from 'react';
import * as R from 'ramda';
import { lifecycle } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { withFirebase } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { models } from '@pesposa/client-core/src/store/firebase/data';
import { selectors as authSelectors } from '@pesposa/client-core/src/store/firebase/auth';

// TODO: we are manually setting up a listener due to a react-redux-firebase bug (?)
// that unsets listener on Messenger page enter
// See:
// https://github.com/prescottprue/react-redux-firebase/issues/423
// https://github.com/prescottprue/react-redux-firebase/issues/368

const WithConversations = ({ children }) => Children.only(children);

const mapStateToProps = createStructuredSelector({
  conversationsQueryPath: R.compose(
    R.prop('path'),
    models.conversations.all.query,
  ),
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
    componentDidMount() {
      if (this.props.isAuthenticated) {
        watchConversations(this.props);
        this.listening = true;
      }
    },
    componentDidUpdate() {
      if (!this.listening && this.props.isAuthenticated) {
        watchConversations(this.props);
        this.listening = true;
      }
    },
  }),
)(WithConversations);
