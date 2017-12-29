import React from 'react';
import hideVisitor from 'components/hocs/hideVisitor';
import logoutHoc from 'components/hocs/logout/logout';
import DropdownMenu from 'components/atoms/DropdownMenu';
import ProfileImage from 'components/atoms/ProfileImage';

const LogoutAction = logoutHoc('span');

const ProfileMenu = () => (
  <DropdownMenu
    anchor={<ProfileImage.Avatar withDefault />}
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

export default hideVisitor(ProfileMenu);
