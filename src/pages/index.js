import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home';
import Profile from './profile';
import Ad from './ad';
import Messages from './messages';

export default () => (
  <Switch>
    <Route path="/profile" component={Profile} />
    <Route path="/i/:adId" component={Ad} />
    <Route path="/messages" component={Messages} />
    <Route path="/" component={Home} />
  </Switch>
);
