import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connectData } from '@pesposa/client-core/src/lib/connectData';
import { models } from '@pesposa/client-core/src/store/firebase/data';
import ConvertExternalUserTasksList from 'modules/ConvertExternalUserTasksList/ConvertExternalUserTasksList';
import ConvertExternalUserTask from 'modules/ConvertExternalUserTask/ConvertExternalUserTask';
import Layout from 'pages/components/Layout/Layout';

const BASE_PATH = '/tasks/convert-external-users';

const ConvertExternalUsers = ({ tasks, isLoaded }) => (
  <Layout title="Convert External Users">
    <Switch>
      <Route
        path={BASE_PATH}
        exact
        render={() => (
          <ConvertExternalUserTasksList
            tasks={tasks}
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
            <ConvertExternalUserTasksList
              tasks={tasks}
              isLoaded={isLoaded}
              basePath={BASE_PATH}
              selected="create"
            />
            <ConvertExternalUserTask {...props} create />
          </React.Fragment>
        )}
      />
      <Route
        path={`${BASE_PATH}/:externalUserId`}
        render={routeProps => (
          <React.Fragment>
            <ConvertExternalUserTasksList
              tasks={tasks}
              isLoaded={isLoaded}
              basePath={BASE_PATH}
              selected={routeProps.match.params.externalUserId}
            />
            <ConvertExternalUserTask {...routeProps} tasks={tasks} />
          </React.Fragment>
        )}
      />
    </Switch>
  </Layout>
);

const mapDataToProps = {
  tasks: models.convertExternalUserTasks.all,
};

export default connectData(mapDataToProps)(ConvertExternalUsers);
