import React from 'react';
import { Banner } from 'rebass';
import ProfileImage from '../../auth/components/ProfileImage';
import UserFullName from '../../auth/components/UserFullName';

export const ProfileBanner = () => (
  <Banner
    style={{ minHeight: '300px' }}
    backgroundImage="https://unsplash.it/1100/400"
  >
    <ProfileImage.Avatar size={128} />
    <UserFullName
      mt={2}
      color="white"
    />
  </Banner>
);

export default ProfileBanner;
