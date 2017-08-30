import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../../Home';
import Login from '../../Auth/login';
import Register from '../../Auth/register';

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
  </Switch>
);
