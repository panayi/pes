import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home';
import Auth from './auth';
import Profile from './profile';

export default () => (
  <Switch>
    <Route path="/auth" component={Auth} />
    <Route exact path="/profile" component={Profile} />
    <Route path="/" component={Home} />
  </Switch>
);
