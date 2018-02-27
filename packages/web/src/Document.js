import React from 'react';
import { AfterRoot, AfterData } from '@jaredpalmer/after';
import { Provider } from 'react-redux';
import { JssProvider, SheetsRegistry } from 'react-jss';
import serialize from 'serialize-javascript';
import Reboot from 'material-ui/Reboot';
import { MuiThemeProvider } from 'material-ui/styles';
import { ssrBehavior } from 'react-md-spinner';
import theme from 'config/theme';
import jss from 'config/styles';
import { constants as searchConstants } from 'store/search';
import ModalProvider from 'pages/components/ModalProvider/ModalProvider';
import SearchProvider from 'components/SearchProvider/SearchProvider';

class Document extends React.Component {
  static async getInitialProps({ assets, data, renderPage, req, store }) {
    // Grab the initial state from our Redux store
    const state = store.getState();

    // This is needed in order to deduplicate the injection of CSS in the page.
    const sheetsManager = new WeakMap();
    // This is needed in order to inject the critical CSS.
    const sheetsRegistry = new SheetsRegistry();

    const page = renderPage(Component => props => (
      <Provider store={store}>
        <SearchProvider id={searchConstants.HOME_SEARCH_ID}>
          <JssProvider registry={sheetsRegistry} jss={jss}>
            <MuiThemeProvider sheetsManager={sheetsManager} theme={theme}>
              <Reboot />
              <Component {...props} />
              <ModalProvider />
            </MuiThemeProvider>
          </JssProvider>
        </SearchProvider>
      </Provider>
    ));

    const css = sheetsRegistry.toString();

    return {
      assets,
      data,
      css,
      state,
      userAgent: req.headers['user-agent'],
      ...page,
    };
  }

  render() {
    const { helmet, assets, data, css, state, userAgent } = this.props;
    // get attributes from React Helmet
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html lang="en-US" {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <title>Welcome to the Afterparty</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {assets.client.css && (
            <link rel="stylesheet" href={assets.client.css} />
          )}
          {css ? <style id="jss-ssr">{css}</style> : ''}
          {ssrBehavior.getStylesheetComponent(userAgent)}
        </head>
        <body {...bodyAttrs}>
          <AfterRoot />
          <AfterData data={data} />
          <script
            type="text/javascript"
            src={assets.client.js}
            defer
            crossOrigin="anonymous"
          />
          <script
            /* eslint-disable react/no-danger */
            dangerouslySetInnerHTML={{
              __html: `window.__PRELOADED_STATE__ = ${serialize(state)}`,
            }}
            /* eslint-enable react/no-danger */
          />
        </body>
      </html>
    );
  }
}

export default Document;
