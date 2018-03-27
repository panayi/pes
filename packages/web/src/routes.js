import * as R from 'ramda';
import { asyncComponent } from '@jaredpalmer/after';
import env from '@pesposa/core/src/config/env';

const routes = [
  {
    path: '/profile/:tab?',
    component: asyncComponent({
      loader: () => import('./pages/profile/index'),
    }),
  },
  {
    path: '/user/:userId/:tab?',
    component: asyncComponent({
      loader: () => import('./pages/profile/index'),
    }),
  },
  {
    path: '/i/:adId',
    component: asyncComponent({
      loader: () => import('./pages/ad/index'),
    }),
  },
  {
    path: '/il/:adId',
    component: asyncComponent({
      loader: () => import('./pages/ad/index'),
    }),
  },
  {
    path: '/messages',
    component: asyncComponent({
      loader: () => import('./pages/messages/index'),
    }),
  },
  {
    path: '/privacy',
    component: asyncComponent({
      loader: () => import('./pages/privacy/index'),
    }),
  },
  {
    path: '/:category?/:place?',
    component: asyncComponent({
      loader: () => import('./pages/home/index'),
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
