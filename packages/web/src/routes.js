import * as R from 'ramda';
import env from '@pesposa/core/src/config/env';
import Home from 'pages/home/index';
import Profile from 'pages/profile/index';
import ViewAd from 'pages/ad/index';
import Messages from 'pages/messages/index';
import Privacy from 'pages/privacy/index';
import Beta from 'pages/beta/index';

const routes = [
  {
    path: '/profile/:tab?',
    component: Profile,
  },
  {
    path: '/user/:userId/:tab?',
    component: Profile,
  },
  {
    path: '/i/:adId',
    component: ViewAd,
  },
  {
    path: '/il/:adId',
    component: ViewAd,
  },
  {
    path: '/messages',
    component: Messages,
  },
  {
    path: '/privacy',
    component: Privacy,
  },
  {
    path: '/:category?/:place?',
    component: Home,
  },
];

// BETA
const finalRoutes = env.betaEnabled
  ? R.prepend(
      {
        path: '/beta',
        component: Beta,
      },
      routes,
    )
  : routes;

export default finalRoutes;
