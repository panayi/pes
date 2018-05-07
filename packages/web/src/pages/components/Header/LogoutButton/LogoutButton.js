import React from 'react';
import { connect } from 'react-redux';
import { actions as authActions } from 'store/firebase/auth';
import Button from 'components/Button/Button';

export const LogoutButton = ({ logout, children, ...rest }) => (
  <Button onClick={() => logout()} {...rest}>
    {children}
  </Button>
);

const mapDispatchToProps = {
  logout: authActions.logout,
};

export default connect(null, mapDispatchToProps)(LogoutButton);
