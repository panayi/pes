import React from 'react';
import { Route, Switch } from 'react-router-dom';
import needsVisitor from 'components/hocs/needsVisitor';
import Layout from 'components/organisms/Layout';
import Login from './login';

const Auth = () => (
  <Layout>
    <Switch>
      <Route exact path="/auth/login" component={Login} />
    </Switch>
  </Layout>
);

export default needsVisitor()(Auth);
