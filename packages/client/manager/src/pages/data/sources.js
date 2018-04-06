import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SourcesList from 'modules/SourcesList/SourcesList';
import Source from 'modules/Source/Source';
import Layout from 'pages/components/Layout/Layout';

const BASE_PATH = '/data/sources';

const Sources = () => (
  <Layout title="Sources">
    <Switch>
      <Route
        path={BASE_PATH}
        exact
        render={() => <SourcesList basePath={BASE_PATH} />}
      />
      <Route
        path={`${BASE_PATH}/create`}
        exact
        render={props => (
          <React.Fragment>
            <SourcesList basePath={BASE_PATH} selected="create" />
            <Source {...props} basePath={BASE_PATH} create />
          </React.Fragment>
        )}
      />
      <Route
        path={`${BASE_PATH}/:sourceId`}
        render={props => (
          <React.Fragment>
            <SourcesList
              basePath={BASE_PATH}
              selected={props.match.params.sourceId}
            />
            <Source {...props} />
          </React.Fragment>
        )}
      />
    </Switch>
  </Layout>
);

export default Sources;
