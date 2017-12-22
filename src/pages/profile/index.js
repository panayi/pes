import React from 'react';
import needsUser from 'components/hocs/needsUser';
import LinkAccount from 'components/molecules/LinkAccount';
import ProfileBanner from 'components/molecules/ProfileBanner';
import Layout from 'components/organisms/Layout';
import MyAds from 'components/organisms/MyAds';

export const Profile = () => (
  <Layout>
    <ProfileBanner />
    <LinkAccount.Buttons />
    <MyAds />
  </Layout>
);

export default needsUser()(Profile);
