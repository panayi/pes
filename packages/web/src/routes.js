import { withProps } from 'recompose';
import Home from 'pages/home/index';
import Profile from 'pages/profile/index';
import ViewAd from 'pages/ad/index';
import Messages from 'pages/messages/index';

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

export default routes;
