import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'multireducer';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import {
  actions as searchActions,
  constants as searchConstants,
} from 'store/search';
import { models } from 'store/firebase/data';
import Search from './search';

class Home extends React.Component {
  static async getInitialProps({ store }) {
    const actions = bindActionCreators(
      { loadPage: searchActions.loadPage },
      store.dispatch,
      searchConstants.HOME_SEARCH_ID,
    );
    const state = store.getState();

    return Promise.all([
      store.firebase.promiseEvents([
        { path: modelPaths.CATEGORIES, type: 'once' },
        { path: models.conversations.all.query(state), type: 'once' },
      ]),
      actions.loadPage(0),
    ]);
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Search} />
        <Route exact path="/c/:category" component={Search} />
        <Route exact path="/:place" component={Search} />
        <Route exact path="/:place/:category" component={Search} />
      </Switch>
    );
  }
}

export default Home;
