import React from 'react';
import ProfileImage from 'components/molecules/ProfileImage';
import UserFullName from 'components/molecules/UserFullName';

export const ProfileBanner = () => (
  <div>
    <img
      style={{ minHeight: '300px' }}
      backgroundImage="https://unsplash.it/1100/400"
      alt="Profile background"
    />
    <ProfileImage.Avatar />
    <UserFullName mt={2} color="white" />
  </div>
);

export default ProfileBanner;
