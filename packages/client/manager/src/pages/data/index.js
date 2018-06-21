import React from 'react';
import { Switch, Route } from 'react-router-dom';
import authorizedRoute from '../hocs/authorizedRoute';
import ExternalUsers from './externalUsers';
import Sources from './sources';

const Data = () => (
  <Switch>
    <Route path="/data/external-users" component={ExternalUsers} />
    <Route path="/data/sources" component={Sources} />
  </Switch>
);

export default authorizedRoute(Data);
