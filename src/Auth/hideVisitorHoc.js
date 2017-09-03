import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import { isAuthenticatedSelector } from './auth';

export default connectedAuthWrapper({
  authenticatedSelector: isAuthenticatedSelector,
});
