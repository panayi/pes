import React from 'react';
import { Route, Switch } from 'react-router-dom';
import needsVisitor from '../../auth/needsVisitorHoc';
import Login from './login';

const Auth = () => (
  <Switch>
    <Route exact path="/auth/login" component={Login} />
  </Switch>
);

export default needsVisitor()(Auth);
