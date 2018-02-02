import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from 'store/createStore';
import registerServiceWorker from 'lib/registerServiceWorker';
import App from './App';

const store = createStore(window.__INITIAL_STATE__); // eslint-disable-line no-underscore-dangle

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
