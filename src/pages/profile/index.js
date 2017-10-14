import React from 'react';
import needsUser from '../../auth/visibility/needsUser';
import Layout from '../../layout';
import ProfilePage from '../../profile';

export const Profile = () => (
  <Layout>
    <ProfilePage />
  </Layout>
);

export default needsUser()(Profile);
