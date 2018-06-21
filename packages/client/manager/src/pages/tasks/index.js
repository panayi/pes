import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import authorizedRoute from '../hocs/authorizedRoute';
import SubmissionTasks from './submissionTasks';
import ReviewAds from './reviewAds';
import ConvertExternalUsers from './convertExternalUsers';

const Tasks = () => (
  <Switch>
    <Redirect exact from="/tasks" to="/tasks/submissions" />
    <Route path="/tasks/submissions" component={SubmissionTasks} />
    <Route path="/tasks/review-ads" component={ReviewAds} />
    <Route
      path="/tasks/convert-external-users"
      component={ConvertExternalUsers}
    />
  </Switch>
);

export default authorizedRoute(Tasks);
