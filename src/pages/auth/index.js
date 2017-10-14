import React from 'react';
import { Route, Switch } from 'react-router-dom';
import needsVisitor from '../../auth/visibility/needsVisitor';
import Layout from '../../layout';
import Login from './login';

const Auth = () => (
  <Layout>
    <Switch>
      <Route exact path="/auth/login" component={Login} />
    </Switch>
  </Layout>
);

export default needsVisitor()(Auth);
