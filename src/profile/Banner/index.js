import React from 'react';
import ProfileImage from '../../auth/components/ProfileImage';
import UserFullName from '../../auth/components/UserFullName';

export const ProfileBanner = () => (
  <div>
    <img
      style={{ minHeight: '300px' }}
      backgroundImage="https://unsplash.it/1100/400"
    />
    <ProfileImage.Avatar />
    <UserFullName
      mt={2}
      color="white"
    />
  </div>
);

export default ProfileBanner;
