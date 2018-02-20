import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ModalProvider from './components/ModalProvider/ModalProvider';
import Home from './home';
import Profile from './profile';
import Ad from './ad';
import Messages from './messages';

const Pages = () => (
  <React.Fragment>
    <Switch>
      <Route path="/profile" component={Profile} />
      <Route path="/user/:userId" component={Profile} />
      <Route path="/i/:adId" component={Ad} />
      <Route path="/il/:adId" render={props => <Ad {...props} legacy />} />
      <Route path="/messages" component={Messages} />
      <Route path="/" component={Home} />
    </Switch>
    <ModalProvider />
  </React.Fragment>
);

export default Pages;
