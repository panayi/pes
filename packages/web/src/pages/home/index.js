import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'multireducer';
import { Helmet } from 'react-helmet';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import getMetaTags from 'utils/getMetaTags';
import {
  actions as searchActions,
  constants as searchConstants,
} from 'store/search';
import ReduxModal from 'components/Modal/ReduxModal/ReduxModal';
import SearchFilters from 'modules/Search/Filters/Filters';
import Search from './search';

class Home extends React.Component {
  static async getInitialProps({ store }) {
    const actions = bindActionCreators(
      { loadPage: searchActions.loadPage },
      store.dispatch,
      searchConstants.HOME_SEARCH_ID,
    );

    await Promise.all([
      store.firebase.promiseEvents([
        { path: modelPaths.CATEGORIES.string, type: 'once' },
        { path: modelPaths.TRANSLATIONS('en', []).string, type: 'once' },
      ]),
      actions.loadPage(0),
    ]);

    return store.getState();
  }

  render() {
    return (
      <React.Fragment>
        <Helmet
          {...getMetaTags({
            title: 'Buy and sell stuff in Cyprus - Pesposa',
            description:
              'Sell your stuff quickly and connect with thousands of buyers. Find cars, houses, electronics and much more, near your location.',
          })}
        />
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/c/:category" component={Search} />
          <Route exact path="/:place" component={Search} />
          <Route exact path="/:place/:category" component={Search} />
        </Switch>
        <ReduxModal
          id="searchFilters"
          content={SearchFilters}
          direction="down"
        />
      </React.Fragment>
    );
  }
}

export default Home;
