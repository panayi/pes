import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';
import registerServiceWorker from 'lib/registerServiceWorker';
import App from './App';

const store = configureStore(window.__INITIAL_STATE__); // eslint-disable-line no-underscore-dangle

ReactDOM.render(
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(
      <Provider store={store}>
        <App store={store} />
      </Provider>,
      document.getElementById('root'),
    );
  });
}

registerServiceWorker();
