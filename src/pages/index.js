import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home';
import Profile from './profile';
import Post from './post';

export default () => (
  <Switch>
    <Route path="/profile" component={Profile} />
    <Route path="/i/:postId" component={Post} />
    <Route path="/" component={Home} />
  </Switch>
);
