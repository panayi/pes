import React from 'react';
import Link from '../auth/Link';
import ProfileBanner from './Banner';
import MyPosts from './MyPosts';

export const Profile = () => (
  <div>
    <ProfileBanner />
    <Link.Buttons />
    <MyPosts />
  </div>
);

export default Profile;
