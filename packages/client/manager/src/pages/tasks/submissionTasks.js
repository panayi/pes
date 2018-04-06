import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connectData } from '@pesposa/client-core/src/lib/connectData';
import { models } from '@pesposa/client-core/src/store/firebase/data';
import SubmissionTasksList from 'modules/SubmissionTasksList/SubmissionTasksList';
import SubmissionTask from 'modules/SubmissionTask/SubmissionTask';
import Layout from 'pages/components/Layout/Layout';

const BASE_PATH = '/tasks/submissions';

const SubmissionTasks = ({ submissionTasks, isLoaded }) => (
  <Layout title="Submissions">
    <Switch>
      <Route
        path={BASE_PATH}
        exact
        render={() => (
          <SubmissionTasksList
            submissionTasks={submissionTasks}
            isLoaded={isLoaded}
            basePath={BASE_PATH}
          />
        )}
      />
      <Route
        path={`${BASE_PATH}/create`}
        exact
        render={props => (
          <React.Fragment>
            <SubmissionTasksList
              submissionTasks={submissionTasks}
              isLoaded={isLoaded}
              basePath={BASE_PATH}
              selected="create"
            />
            <SubmissionTask {...props} basePath={BASE_PATH} create />
          </React.Fragment>
        )}
      />
      <Route
        path={`${BASE_PATH}/:submissionTaskId`}
        render={routeProps => (
          <React.Fragment>
            <SubmissionTasksList
              submissionTasks={submissionTasks}
              isLoaded={isLoaded}
              basePath={BASE_PATH}
              selected={routeProps.match.params.submissionTaskId}
            />
            <SubmissionTask
              {...routeProps}
              submissionTasks={submissionTasks}
              basePath={BASE_PATH}
            />
          </React.Fragment>
        )}
      />
    </Switch>
  </Layout>
);

const mapDataToProps = {
  submissionTasks: models.submissionTasks.all,
};

export default connectData(mapDataToProps)(SubmissionTasks);
