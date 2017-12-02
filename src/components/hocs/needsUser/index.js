import { Component } from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import { isAuthenticatedSelector, isAuthenticatingSelector } from 'store/auth/selectors';
import LoginModal from 'components/organisms/LoginModal';

export class DisplayLoginModal extends Component {
  componentWillMount() {
    this.props.showLoginModal();
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = {
  showLoginModal: LoginModal.showAction,
};

const ConnectedDisplayLoginModal = connect(null, mapDispatchToProps)(DisplayLoginModal);

export default options => connectedAuthWrapper({
  authenticatedSelector: isAuthenticatedSelector,
  authenticatingSelector: isAuthenticatingSelector,
  FailureComponent: ConnectedDisplayLoginModal,
  ...R.defaultTo({}, options),
});
