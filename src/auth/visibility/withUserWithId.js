import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import { isUserSelector } from '../auth';

export default userSelector => connectedAuthWrapper({
  authenticatedSelector: isUserSelector(userSelector),
});
