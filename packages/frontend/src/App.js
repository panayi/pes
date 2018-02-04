import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { InstantSearch } from 'react-instantsearch/dom';
import { create } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import jssExpand from 'jss-expand';
import {
  MuiThemeProvider,
  createGenerateClassName,
  jssPreset,
} from 'material-ui/styles';
import 'normalize.css/normalize.css';
import { algolia as algoliaConfig } from 'pesposa-config';
import theme from 'config/theme';
import ModalProvider from 'components/molecules/ModalProvider';
import Pages from './pages';

const jss = create({ plugins: [...jssPreset().plugins, jssExpand()] });
const generateClassName = createGenerateClassName();

const App = ({ store }) => (
  <ConnectedRouter history={store.history}>
    <InstantSearch
      appId={process.env.REACT_APP_ALGOLIA_APP_ID}
      apiKey={process.env.REACT_APP_ALGOLIA_SEARCH_KEY}
      indexName={algoliaConfig.ADS_INDEXES.byDateDesc}
    >
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <Pages />
          <ModalProvider />
        </MuiThemeProvider>
      </JssProvider>
    </InstantSearch>
  </ConnectedRouter>
);

export default App;
