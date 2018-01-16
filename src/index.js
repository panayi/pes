import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { InstantSearch } from 'react-instantsearch/dom';
import { MuiThemeProvider } from 'material-ui/styles';
import 'normalize.css/normalize.css';
import createStore from 'store/createStore';
import { ADS_INDEXES } from 'config/algolia';
import theme from 'config/theme';
import setCurrentUserIp from 'components/hocs/setCurrentUserIp';
import ModalProvider from 'components/molecules/ModalProvider';
import registerServiceWorker from 'lib/registerServiceWorker';
import Pages from './pages';

const store = createStore(window.__INITIAL_STATE__); // eslint-disable-line no-underscore-dangle

const App = setCurrentUserIp(() => (
  <div>
    <Pages />
    <ModalProvider />
  </div>
));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={store.history}>
      <InstantSearch
        appId={process.env.REACT_APP_ALGOLIA_APP_ID}
        apiKey={process.env.REACT_APP_ALGOLIA_SEARCH_KEY}
        indexName={ADS_INDEXES.default}
      >
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </InstantSearch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
