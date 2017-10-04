import React from 'react';
import { Switch, Route } from 'react-router-dom';
import asyncComponent from '../lib/hocs/asyncComponent';
import Home from './home';
import Auth from './auth';
import Profile from './profile';
import Post from './post';

const Admin = asyncComponent(() => import('./admin'));

export default () => (
  <Switch>
    <Route path="/admin" component={Admin} />
    <Route path="/auth" component={Auth} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/post" component={Post} />
    <Route path="/" component={Home} />
  </Switch>
);
