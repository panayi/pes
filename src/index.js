import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Provider as RebassProvider } from 'rebass';
import { ConnectedRouter } from 'react-router-redux';
import 'normalize.css/normalize.css';
import registerServiceWorker from './lib/registerServiceWorker';
import createStore from './lib/store/createStore';
import App from './pages';
import Layout from './layout';
import theme from './theme';
import './index.css';

const store = createStore(window.__INITIAL_STATE__); // eslint-disable-line no-underscore-dangle

ReactDOM.render((
  <Provider store={store}>
    <RebassProvider theme={theme}>
      <ConnectedRouter history={store.history}>
        <Layout>
          <App />
        </Layout>
      </ConnectedRouter>
    </RebassProvider>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
