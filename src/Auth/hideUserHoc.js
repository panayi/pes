import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import { isNotAuthenticatedSelector } from './auth';

export default connectedAuthWrapper({
  authenticatedSelector: isNotAuthenticatedSelector,
});
