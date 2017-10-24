import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { MuiThemeProvider } from 'material-ui/styles';
import 'normalize.css/normalize.css';
import createStore from 'store/createStore';
import theme from 'config/theme';
import registerServiceWorker from 'lib/registerServiceWorker';
import App from './pages';

const store = createStore(window.__INITIAL_STATE__); // eslint-disable-line no-underscore-dangle

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={store.history}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
