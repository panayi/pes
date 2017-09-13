import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Page from '../../lib/components/Page';
import SideNav from '../../lib/components/SideNav';
import needsAdmin from '../../auth/visibility/needsAdminHoc';
import Users from './users';

const adminLinks = [
  {
    label: 'Users',
    to: '/admin/users',
  },
  {
    label: 'Categories',
    to: '/admin/categories',
  },
  {
    label: 'Posts',
    to: '/admin/posts',
  },
];

const Admin = () => (
  <Page>
    <SideNav
      header="Admin"
      links={adminLinks}
    />
    <Switch>
      <Route exact path="/admin/users" component={Users} />
    </Switch>
  </Page>
);

export default needsAdmin()(Admin);
