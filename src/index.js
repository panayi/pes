import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { InstantSearch } from 'react-instantsearch/dom';
import { MuiThemeProvider } from 'material-ui/styles';
import 'normalize.css/normalize.css';
import createStore from 'store/createStore';
import theme from 'config/theme';
import Modal from 'components/molecules/Modal';
import registerServiceWorker from 'lib/registerServiceWorker';
import App from './pages';

const store = createStore(window.__INITIAL_STATE__); // eslint-disable-line no-underscore-dangle

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={store.history}>
      <InstantSearch
        appId={process.env.REACT_APP_ALGOLIA_APP_ID}
        apiKey={process.env.REACT_APP_ALGOLIA_SEARCH_KEY}
        indexName={process.env.REACT_APP_ALGOLIA_POSTS_INDEX_NAME}
      >
        <MuiThemeProvider theme={theme}>
          <div>
            <App />
            <Modal />
          </div>
        </MuiThemeProvider>
      </InstantSearch>
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
