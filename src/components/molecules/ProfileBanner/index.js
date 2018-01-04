import React from 'react';
import UserFullName from 'components/atoms/UserFullName';
import ProfileImage from 'components/atoms/ProfileImage';

export const ProfileBanner = () => (
  <div>
    <img
      style={{ minHeight: '300px' }}
      backgroundImage="https://unsplash.it/1100/400"
      alt="Profile background"
    />
    <ProfileImage me />
    <UserFullName mt={2} color="white" />
  </div>
);

export default ProfileBanner;
