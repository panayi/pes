import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectors as authSelectors } from 'store/firebase/auth';
import hideVisitor from 'hocs/hideVisitor';
import logoutHoc from 'hocs/logout/logout';
import DropdownMenu from 'components/DropdownMenu/DropdownMenu';
import ProfileImage from 'components/ProfileImage/ProfileImage';

const LogoutAction = logoutHoc('span');

const ProfileMenu = ({ currentUserId }) => (
  <DropdownMenu
    anchor={<ProfileImage userId={currentUserId} withDefault />}
    items={[
      {
        id: 'profile',
        to: '/profile',
        label: 'Profile',
      },
      {
        id: 'logout',
        label: <LogoutAction>Logout</LogoutAction>,
      },
    ]}
  />
);

const mapStateToProps = createStructuredSelector({
  currentUserId: authSelectors.uidSelector,
});

export default R.compose(hideVisitor, connect(mapStateToProps))(ProfileMenu);
