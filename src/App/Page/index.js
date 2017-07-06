import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../../home';
import Login from '../../auth/login';
import Register from '../../auth/register';

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
  </Switch>
);
