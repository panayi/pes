import { Component } from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import { selectors as authSelectors } from 'store/firebase/auth';
import Login from 'components/organisms/Login';

export class DisplayLoginModal extends Component {
  componentWillMount() {
    this.props.showLoginModal();
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = {
  showLoginModal: Login.showAction,
};

const ConnectedDisplayLoginModal = connect(null, mapDispatchToProps)(
  DisplayLoginModal,
);

export default options =>
  connectedAuthWrapper({
    authenticatedSelector: authSelectors.isAuthenticatedSelector,
    authenticatingSelector: authSelectors.isAuthenticatingSelector,
    FailureComponent: ConnectedDisplayLoginModal,
    ...R.defaultTo({}, options),
  });
