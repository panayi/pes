import React from 'react';
import { JssProvider } from 'react-jss';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import jss from '@pesposa/client-core/src/config/styles';
import theme from '@pesposa/client-core/src/config/theme';
import configureStore from './store/configureStore';
import Pages from './pages';

const history = createHistory();

const store = configureStore({}, history);

const App = () => (
  <Provider store={store}>
    <BrowserRouter basename="/manager">
      <JssProvider jss={jss}>
        <MuiThemeProvider theme={theme}>
          <Pages />
          <CssBaseline />
        </MuiThemeProvider>
      </JssProvider>
    </BrowserRouter>
  </Provider>
);

export default App;
