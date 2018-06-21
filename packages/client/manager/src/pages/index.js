import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Tasks from './tasks';
import Data from './data';
import Login from './login';
import Unauthorized from './unauthorized';

const App = () => (
  <React.Fragment>
    <Switch>
      <Redirect exact from="/" to="/tasks" />
      <Route path="/tasks" component={Tasks} />
      <Route path="/data" component={Data} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/unauthorized" component={Unauthorized} />
    </Switch>
  </React.Fragment>
);

export default App;
