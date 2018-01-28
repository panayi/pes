import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectors as authSelectors } from 'store/firebase/auth';
import hideVisitor from 'components/hocs/hideVisitor';
import logoutHoc from 'components/hocs/logout/logout';
import DropdownMenu from 'components/atoms/DropdownMenu';
import ProfileImage from 'components/atoms/ProfileImage';

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
