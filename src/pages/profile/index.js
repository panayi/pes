import React from 'react';
import needsUser from 'components/hocs/needsUser';
import Layout from 'components/organisms/Layout';
import Link from 'components/smarts/Link';
import ProfileBanner from 'components/organisms/ProfileBanner';
import MyAds from 'components/smarts/MyAds';

export const Profile = () => (
  <Layout>
    <ProfileBanner />
    <Link.Buttons />
    <MyAds />
  </Layout>
);

export default needsUser()(Profile);
