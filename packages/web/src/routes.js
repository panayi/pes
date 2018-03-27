import React from 'react';
import * as R from 'ramda';
import { asyncComponent } from '@jaredpalmer/after';
import env from '@pesposa/core/src/config/env';
import Spinner from 'components/Spinner/Spinner';

const Placeholder = () => <Spinner overlay centered />;

const routes = [
  {
    path: '/profile/:tab?',
    component: asyncComponent({
      loader: () => import('./pages/profile/index'),
      Placeholder,
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
  {
    path: '/:category?/:place?',
    component: asyncComponent({
      loader: () => import('./pages/home/index'),
      Placeholder,
    }),
  },
];

// BETA
const finalRoutes = env.betaEnabled
  ? R.prepend(
      {
        path: '/beta',
        component: asyncComponent({
          loader: () => import('./pages/beta/index'),
        }),
      },
      routes,
    )
  : routes;

export default finalRoutes;
