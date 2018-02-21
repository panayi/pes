/* @flow */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Search from './search';

const Home = () => (
  <Switch>
    <Route exact path="/" component={Search} />
    <Route exact path="/c/:category" component={Search} />
    <Route exact path="/:place" component={Search} />
    <Route exact path="/:place/:category" component={Search} />
  </Switch>
);

export default Home;
