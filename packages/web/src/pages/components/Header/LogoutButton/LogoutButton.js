import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import Button from 'components/Button/Button';

export const LogoutButton = ({ firebase, children, ...rest }) => (
  <Button onClick={() => firebase.logout()} {...rest}>
    {children}
  </Button>
);

export default firebaseConnect()(LogoutButton);
