import React from 'react';
import { NavLink } from 'react-router-dom';
import { Toolbar, NavLink as RebassNavLink } from 'rebass';

export default () => (
  <Toolbar>
    <RebassNavLink>
      Pesposa
    </RebassNavLink>
    <RebassNavLink
      name="home"
      to="/"
      is={NavLink}
      exact
    >
      Home
    </RebassNavLink>
    <RebassNavLink ml="auto">
      Login
    </RebassNavLink>
  </Toolbar>
);
