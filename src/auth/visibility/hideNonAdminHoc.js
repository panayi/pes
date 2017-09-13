import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import { isAdminSelector } from '../auth';

export default connectedAuthWrapper({
  authenticatedSelector: isAdminSelector,
});
