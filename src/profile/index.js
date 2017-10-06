import React from 'react';
import { Flex, Box } from 'rebass';
import Link from '../auth/Link';
import ProfileBanner from './Banner';
import MyPosts from './MyPosts';

export const Profile = () => (
  <Flex
    column
    width="100%"
  >
    <Box flex="1">
      <ProfileBanner />
    </Box>
    <Link.Buttons />
    <MyPosts />
  </Flex>
);

export default Profile;
