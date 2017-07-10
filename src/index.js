import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createStore from './lib/store/createStore';
import App from './app';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const store = createStore(window.__INITIAL_STATE__); // eslint-disable-line no-underscore-dangle

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={store.history}>
      <App />
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
