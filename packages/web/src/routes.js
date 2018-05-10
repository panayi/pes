import React from 'react';
import { asyncComponent } from '@jaredpalmer/after';
import Spinner from 'components/Spinner/Spinner';

const Placeholder = () => <Spinner overlay centered />;

const routes = [
  {
    path: '/user/:userId/:tab?',
    exact: true,
    component: asyncComponent({
      loader: () => import('./pages/profile/index'),
      Placeholder,
    }),
  },
  {
    path: '/profile/:tab?',
    exact: true,
    component: asyncComponent({
      loader: () => import('./pages/profile/me'),
      Placeholder,
    }),
  },
  {
    path: '/i/:adId',
    exact: true,
    component: asyncComponent({
      loader: () => import('./pages/ad/index'),
      Placeholder,
    }),
  },
  {
    path: '/il/:adId',
    exact: true,
    component: asyncComponent({
      loader: () => import('./pages/ad/index'),
      Placeholder,
    }),
  },
  {
    path: '/messages',
    component: asyncComponent({
      loader: () => import('./pages/messages/index'),
      Placeholder,
    }),
  },
  {
    path: '/privacy',
    exact: true,
    component: asyncComponent({
      loader: () => import('./pages/privacy/index'),
      Placeholder,
    }),
  },
  // BETA
  {
    path: '/beta/in',
    exact: true,
    redirectTo: '/',
  },
  {
    path: '/enter',
    exact: true,
    redirectTo: '/',
  },
  {
    path: '/beta',
    exact: true,
    redirectTo: '/',
  },
  {
    path: '/join',
    exact: true,
    redirectTo: '/',
  },
  {
    path: '/login',
    exact: true,
    redirectTo: '/',
  },
  {
    path: '/c/:category?/:place?',
    exact: true,
    component: asyncComponent({
      loader: () => import('./pages/home/index'),
      Placeholder,
    }),
  },
  {
    path: '/',
    exact: true,
    component: asyncComponent({
      loader: () => import('./pages/home/index'),
      Placeholder,
    }),
  },
  {
    path: '**',
    component: asyncComponent({
      loader: () => import('./components/NotFound/NotFound'),
    }),
  },
];

export default routes;
