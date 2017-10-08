import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import 'normalize.css/normalize.css';
import registerServiceWorker from './lib/registerServiceWorker';
import createStore from './lib/store/createStore';
import App from './pages';
import Layout from './layout';
import './index.css';

const store = createStore(window.__INITIAL_STATE__); // eslint-disable-line no-underscore-dangle

ReactDOM.render((
  <Provider store={store}>
      <ConnectedRouter history={store.history}>
        <Layout>
          <App />
        </Layout>
      </ConnectedRouter>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
