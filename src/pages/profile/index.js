import React from 'react';
import needsUser from '../../auth/needsUserHoc';
import Link from '../../auth/Link';

export const Profile = () => (
  <div>
    <Link>
      <Link.Button withProvider="google" />
      <Link.Button withProvider="facebook" />
    </Link>
  </div>
);

export default needsUser()(Profile);
