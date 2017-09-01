import React from 'react';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import { isAuthenticatedSelector } from '../../Auth/auth';

export const Profile = () => (
  <div>Profile</div>
);

export default connectedRouterRedirect({
  redirectPath: '/login',
  authenticatedSelector: isAuthenticatedSelector,
})(Profile);
