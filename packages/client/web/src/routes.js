import React from 'react';
import { asyncComponent } from '@jaredpalmer/after';
import Spinner from '@pesposa/client-core/src/components/Spinner/Spinner';

const Placeholder = () => <Spinner overlay centered />;

const routes = [
  {
    path: '/user/e/:userId/:tab?',
    exact: true,
    component: asyncComponent({
      loader: () => import('./pages/profile/index'),
      Placeholder,
    }),
  },
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
  {
    path: '/sell/:code/:adId?',
    exact: true,
    component: asyncComponent({
      loader: () => import('./pages/sell/index'),
      Placeholder,
    }),
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
