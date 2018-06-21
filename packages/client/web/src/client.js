import React from 'react';
import * as R from 'ramda';
import ReactDOM, { hydrate } from 'react-dom';
import { JssProvider, SheetsRegistry } from 'react-jss';
import { BrowserRouter } from 'react-router-dom';
import { ensureReady, After } from '@jaredpalmer/after';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import jss from '@pesposa/client-core/src/config/styles';
import theme from '@pesposa/client-core/src/config/theme';
import { constants as searchConstants } from '@pesposa/client-core/src/store/search';
import { selectors as responsiveSelectors } from '@pesposa/client-core/src/store/responsive';
import SearchProvider from '@pesposa/client-core/src/modules/Search/Provider/Provider';
import TrackGlobalEvents from '@pesposa/client-core/src/modules/Mixpanel/TrackGlobalEvents/TrackGlobalEvents';
import 'lib/rollbar';
import configureStore from 'store/configureStore';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import HotjarProvider from 'components/HotjarProvider/HotjarProvider';
import GoogleAnalyticsProvider from 'components/GoogleAnalyticsProvider/GoogleAnalyticsProvider';
import routes from 'routes';

const history = createHistory();

// This is needed in order to deduplicate the injection of CSS in the page.
const sheetsManager = new WeakMap();

ensureReady(routes).then(state => {
  const finalState = R.compose(
    R.dissocPath(['firebase', 'profile']),
    R.dissocPath(['firebase', 'auth']),
  )(state);
  const store = configureStore(finalState, history);

  const sheetsRegistry = new SheetsRegistry();

  let renderMethod = hydrate;
  let rootId = 'root';

  // If the app was rendered with a different breakpoint on the server than on the client,
  // fuck it and just re-render the whole app
  const widthMismatch = responsiveSelectors.widthMismatchSelector(finalState);
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
                    <After data={state} routes={routes} store={store} />
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
