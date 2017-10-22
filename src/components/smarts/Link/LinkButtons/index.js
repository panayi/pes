import React from 'react';
import Link from '../../Link';

export const LinkButtons = () => (
  <Link>
    <Link.Button withProvider="google" />
    <Link.Button withProvider="facebook" />
  </Link>
);

export default LinkButtons;
