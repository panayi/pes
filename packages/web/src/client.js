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
import 'lib/rollbar';
import configureStore from 'store/configureStore';
import { constants as searchConstants } from 'store/search';
import { selectors as responsiveSelectors } from 'store/responsive';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import HotjarProvider from 'components/HotjarProvider/HotjarProvider';
import GoogleAnalyticsProvider from 'components/GoogleAnalyticsProvider/GoogleAnalyticsProvider';
import SearchProvider from 'modules/Search/Provider/Provider';
import TrackGlobalEvents from 'modules/Mixpanel/TrackGlobalEvents/TrackGlobalEvents';
import routes from 'routes';

const history = createHistory();

// This is needed in order to deduplicate the injection of CSS in the page.
const sheetsManager = new WeakMap();

ensureReady(routes).then(data => {
  const finalData = R.compose(
    R.dissocPath(['firebase', 'profile']),
    R.dissocPath(['firebase', 'auth']),
  )(data);
  const store = configureStore(finalData, history);

  const sheetsRegistry = new SheetsRegistry();

  let renderMethod = hydrate;
  let rootId = 'root';

  // If the app was rendered with a different breakpoint on the server than on the client,
  // fuck it and just re-render the whole app
  const widthMismatch = responsiveSelectors.widthMismatchSelector(finalData);
  if (widthMismatch) {
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.parentNode.removeChild(rootEl);
    }
    rootId = 'root2';
    renderMethod = ReactDOM.render;
  } else {
    const root2El = document.getElementById('root2');
    if (root2El) {
      root2El.parentNode.removeChild(root2El);
    }
  }

  renderMethod(
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <SearchProvider id={searchConstants.HOME_SEARCH_ID}>
            <JssProvider registry={sheetsRegistry} jss={jss}>
              <MuiThemeProvider sheetsManager={sheetsManager} theme={theme}>
                <React.Fragment>
                  <CssBaseline />
                  <div>
                    <After data={data} routes={routes} store={store} />
                  </div>
                </React.Fragment>
              </MuiThemeProvider>
            </JssProvider>
          </SearchProvider>
          <HotjarProvider />
          <TrackGlobalEvents />
          <GoogleAnalyticsProvider />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>,
    document.getElementById(rootId),
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
