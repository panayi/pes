import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import logo from './logo.svg';

export default () => (
  <Menu
    fixed="top"
    inverted
  >
    <Menu.Item>
      <img
        src={logo}
        alt="logo"
      />
    </Menu.Item>
    <Menu.Item
      name="home"
      to="/"
      as={NavLink}
      exact
    />
  </Menu>
);
