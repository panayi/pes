import React from 'react';
import { hydrate } from 'react-dom';
import { JssProvider, SheetsRegistry } from 'react-jss';
import { BrowserRouter } from 'react-router-dom';
import { ensureReady, After } from '@jaredpalmer/after';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import Reboot from 'material-ui/Reboot';
import { MuiThemeProvider } from 'material-ui/styles';
import jss from 'config/styles';
import theme from 'config/theme';
import configureStore from 'store/configureStore';
import { constants as searchConstants } from 'store/search';
import SearchProvider from 'components/SearchProvider/SearchProvider';
import routes from 'routes';

const history = createHistory();

const store = configureStore(window.__PRELOADED_STATE__, history);

// This is needed in order to deduplicate the injection of CSS in the page.
const sheetsManager = new WeakMap();

ensureReady(routes).then(data => {
  const sheetsRegistry = new SheetsRegistry();

  return hydrate(
    <BrowserRouter>
      <Provider store={store}>
        <SearchProvider id={searchConstants.HOME_SEARCH_ID}>
          <JssProvider registry={sheetsRegistry} jss={jss}>
            <MuiThemeProvider sheetsManager={sheetsManager} theme={theme}>
              <Reboot />
              <After data={data} routes={routes} />
            </MuiThemeProvider>
          </JssProvider>
        </SearchProvider>
      </Provider>
    </BrowserRouter>,
    document.getElementById('root'),
    () => {
      // [ReHydratation](https://github.com/cssinjs/jss/blob/master/docs/ssr.md)
      const jssStyles = document.getElementById('jss-ssr');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    },
  );
});

if (module.hot) {
  module.hot.accept();
}
