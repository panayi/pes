import React from 'react';
import { connect } from 'react-redux';
import { actions as authActions } from 'store/firebase/auth';
import Button from 'components/Button/Button';

// BETA
// TODO: remove `window.location.href = '/login'`

export const LogoutButton = ({ logout, children, ...rest }) => (
  <Button
    onClick={async () => {
      await logout();
      window.location.href = '/login';
    }}
    {...rest}
  >
    {children}
  </Button>
);

const mapDispatchToProps = {
  logout: authActions.logout,
};

export default connect(null, mapDispatchToProps)(LogoutButton);
