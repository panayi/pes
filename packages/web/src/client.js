import React from 'react';
import * as R from 'ramda';
import ReactDOM, { hydrate } from 'react-dom';
import { JssProvider, SheetsRegistry } from 'react-jss';
import { BrowserRouter } from 'react-router-dom';
import { ensureReady, After } from '@jaredpalmer/after';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import CssBaseline from 'material-ui/CssBaseline';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import jss from 'config/styles';
import theme from 'config/theme';
import configureStore from 'store/configureStore';
import { constants as searchConstants } from 'store/search';
import { selectors as responsiveSelectors } from 'store/responsive';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import SearchProvider from 'modules/Search/Provider/Provider';
import routes from 'routes';

// TODO: Find a better way to implement a spinner
// that is shown while script is loading
window.onload = () => {
  const element = document.querySelector('#script-loading-spinner');
  if (element) {
    element.parentNode.removeChild(element);
  }
};

const history = createHistory();

// This is needed in order to deduplicate the injection of CSS in the page.
const sheetsManager = new WeakMap();

ensureReady(routes).then(data => {
  const finalData = R.compose(
    R.dissocPath(['firebase', 'auth']),
    R.omit(['showSpinner']),
  )(data);
  const store = configureStore(finalData, history);

  const sheetsRegistry = new SheetsRegistry();

  const widthMismatch = responsiveSelectors.widthMismatchSelector(finalData);

  // If the app was rendered with a different breakpoint on the server than on the client,
  // fuck it and just re-render the whole app
  const renderMethod = widthMismatch ? ReactDOM.render : hydrate;

  renderMethod(
    <BrowserRouter>
      <ErrorBoundary>
        <Provider store={store}>
          <SearchProvider id={searchConstants.HOME_SEARCH_ID}>
            <JssProvider registry={sheetsRegistry} jss={jss}>
              <MuiThemeProvider sheetsManager={sheetsManager} theme={theme}>
                <React.Fragment>
                  <CssBaseline />
                  <After data={data} routes={routes} store={store} />
                </React.Fragment>
              </MuiThemeProvider>
            </JssProvider>
          </SearchProvider>
        </Provider>
      </ErrorBoundary>
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
