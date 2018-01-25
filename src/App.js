import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { InstantSearch } from 'react-instantsearch/dom';
import { MuiThemeProvider } from 'material-ui/styles';
import 'normalize.css/normalize.css';
import { ADS_INDEXES } from 'config/algolia';
import theme from 'config/theme';
import setCurrentUserLocation from 'components/hocs/setCurrentUserLocation';
import ModalProvider from 'components/molecules/ModalProvider';
import Pages from './pages';

const App = ({ store }) => (
  <ConnectedRouter history={store.history}>
    <InstantSearch
      appId={process.env.REACT_APP_ALGOLIA_APP_ID}
      apiKey={process.env.REACT_APP_ALGOLIA_SEARCH_KEY}
      indexName={ADS_INDEXES.byDateDesc}
    >
      <MuiThemeProvider theme={theme}>
        <Pages />
        <ModalProvider />
      </MuiThemeProvider>
    </InstantSearch>
  </ConnectedRouter>
);

export default setCurrentUserLocation(App);
