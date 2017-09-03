import React from 'react';
import { Route, Switch } from 'react-router-dom';
import needsVisitor from '../../Auth/needsVisitorHoc';
import Login from './login';
import Register from './register';

const Auth = () => (
  <Switch>
    <Route exact path="/auth/login" component={Login} />
    <Route exact path="/auth/register" component={Register} />
  </Switch>
);

export default needsVisitor()(Auth);
