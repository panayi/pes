import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Provider as RebassProvider } from 'rebass';
import { ConnectedRouter } from 'react-router-redux';
import 'normalize.css/normalize.css';
import createStore from './lib/store/createStore';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';


const store = createStore(window.__INITIAL_STATE__); // eslint-disable-line no-underscore-dangle

ReactDOM.render((
  <Provider store={store}>
    <RebassProvider>
      <ConnectedRouter history={store.history}>
        <App />
      </ConnectedRouter>
    </RebassProvider>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
