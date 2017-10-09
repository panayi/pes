import React from 'react';
import needsUser from '../../auth/visibility/needsUser';
import Page from '../../lib/components/Page';
import ProfilePage from '../../profile';

export const Profile = () => (
  <Page
    fixedWidth
    center
    justify="center"
  >
    <ProfilePage />
  </Page>
);

export default needsUser()(Profile);
