import * as R from 'ramda';
import { withProps } from 'recompose';
import Home from 'pages/home/index';
import Profile from 'pages/profile/index';
import ViewAd from 'pages/ad/index';
import Messages from 'pages/messages/index';
import Beta, { BETA_ENABLED } from 'pages/beta/index';

const routes = [
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/user/:userId',
    component: Profile,
  },
  {
    path: '/i/:adId',
    component: ViewAd,
  },
  {
    path: '/il/:adId',
    component: withProps({ legacy: true })(ViewAd),
  },
  {
    path: '/messages',
    component: Messages,
  },
  {
    path: '/',
    component: Home,
  },
];

// BETA
const finalRoutes = BETA_ENABLED
  ? R.prepend(
      {
        path: '/beta',
        component: Beta,
      },
      routes,
    )
  : routes;

export default finalRoutes;
