import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import { isNotAuthenticatedSelector } from 'store/auth/selectors';

export default component => connectedAuthWrapper({
  authenticatedSelector: isNotAuthenticatedSelector,
})(component);
