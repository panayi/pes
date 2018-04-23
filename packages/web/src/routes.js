import React from 'react';
import qs from 'querystringify';
import { asyncComponent } from '@jaredpalmer/after';
import Spinner from 'components/Spinner/Spinner';

const Placeholder = () => <Spinner overlay centered />;

const routes = [
  {
    // Legacy
    path: /\/(post)|(advertise-on-pesposa)|(users\/sign-in)|(users\/sign-up)|(terms)|(featured-ads)/,
    component: asyncComponent({
      loader: () => import('./components/NotFound/NotFound'),
    }),
  },
  {
    path: '/user/:userId/:tab?',
    component: asyncComponent({
      loader: () => import('./pages/profile/index'),
      Placeholder,
    }),
  },
  {
    path: '/i/:adId',
    component: asyncComponent({
      loader: () => import('./pages/ad/index'),
      Placeholder,
    }),
  },
  {
    path: '/il/:adId',
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
    component: asyncComponent({
      loader: () => import('./pages/privacy/index'),
      Placeholder,
    }),
  },
  // BETA
  {
    path: '/beta/in',
    redirectTo: '/enter',
  },
  {
    path: '/enter',
    component: asyncComponent({
      loader: () => import('./pages/beta/enter'),
    }),
  },
  {
    path: '/beta',
    redirectTo: (a, b, path) => {
      const params = qs.parse(path) || {};

      if (params.code) {
        return '/login';
      }

      return '/join';
    },
  },
  {
    path: '/join',
    component: asyncComponent({
      loader: () => import('./pages/beta/join'),
    }),
  },
  {
    path: '/login',
    component: asyncComponent({
      loader: () => import('./pages/beta/login'),
    }),
  },
  {
    path: '/:category?/:place?',
    component: asyncComponent({
      loader: () => import('./pages/home/index'),
      Placeholder,
    }),
  },
];

export default routes;
