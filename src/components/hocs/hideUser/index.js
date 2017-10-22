import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import { isNotAuthenticatedSelector } from 'store/auth/selectors';

export default connectedAuthWrapper({
  authenticatedSelector: isNotAuthenticatedSelector,
});
