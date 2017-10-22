import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import { isUserSelector } from 'store/auth/selectors';

export default userSelector => connectedAuthWrapper({
  authenticatedSelector: isUserSelector(userSelector),
});
