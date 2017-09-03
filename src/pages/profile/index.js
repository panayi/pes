import React from 'react';
import needsUser from '../../Auth/needsUserHoc';

export const Profile = () => (
  <div>Profile</div>
);

export default needsUser()(Profile);
