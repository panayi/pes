import React from 'react';
import needsUser from '../../Auth/needsUserHoc';
import Link from '../../Auth/Link';

export const Profile = () => (
  <div>
    <Link>
      <Link.Button withProvider="google" />
      <Link.Button withProvider="facebook" />
    </Link>
  </div>
);

export default needsUser()(Profile);
