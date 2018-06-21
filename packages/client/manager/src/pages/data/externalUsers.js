import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ExternalUsersList from 'modules/ExternalUsersList/ExternalUsersList';
import ExternalUser from 'modules/ExternalUser/ExternalUser';
import Layout from '../components/Layout/Layout';

const BASE_PATH = '/data/external-users';

const Sellers = () => (
  <Layout title="ExternalUsers">
    <Switch>
      <Route
        path={BASE_PATH}
        exact
        render={() => <ExternalUsersList basePath={BASE_PATH} />}
      />
      <Route
        path={`${BASE_PATH}/create`}
        exact
        render={props => (
          <React.Fragment>
            <ExternalUsersList basePath={BASE_PATH} selected="create" />
            <ExternalUser {...props} create />
          </React.Fragment>
        )}
      />
      <Route
        path={`${BASE_PATH}/:externalUserId`}
        render={props => (
          <React.Fragment>
            <ExternalUsersList
              basePath={BASE_PATH}
              selected={props.match.params.externalUserId}
            />
            <ExternalUser {...props} />
          </React.Fragment>
        )}
      />
    </Switch>
  </Layout>
);

export default Sellers;
