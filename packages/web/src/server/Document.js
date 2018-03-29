import React from 'react';
import * as R from 'ramda';
import { AfterRoot, AfterData } from '@jaredpalmer/after';
import { JssProvider, SheetsRegistry } from 'react-jss';
import CssBaseline from 'material-ui/CssBaseline';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ssrBehavior } from 'react-md-spinner';
import theme from 'config/theme';
import jss from 'config/styles';
import { constants as searchConstants } from 'store/search';
import Spinner from 'components/Spinner/Spinner';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import SearchProvider from 'modules/Search/Provider/Provider';

class Document extends React.Component {
  static async getInitialProps({ assets, data, renderPage, req }) {
    // This is needed in order to deduplicate the injection of CSS in the page.
    const sheetsManager = new WeakMap();
    // This is needed in order to inject the critical CSS.
    const sheetsRegistry = new SheetsRegistry();

    const page = await renderPage(Component => props => (
      <ErrorBoundary>
        <SearchProvider id={searchConstants.HOME_SEARCH_ID}>
          <JssProvider registry={sheetsRegistry} jss={jss}>
            <MuiThemeProvider sheetsManager={sheetsManager} theme={theme}>
              <CssBaseline />
              <Component {...props} />
            </MuiThemeProvider>
          </JssProvider>
        </SearchProvider>
      </ErrorBoundary>
    ));

    const css = sheetsRegistry.toString();

    return {
      assets,
      data,
      css,
      userAgent: req.headers['user-agent'],
      ...page,
    };
  }

  render() {
    const { helmet, assets, data, css, userAgent } = this.props;
    const showSpinner = R.prop('showSpinner', data);

    // get attributes from React Helmet
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html lang="en-US" {...htmlAttrs}>
        <head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/safari-pinned-tab.svg"
            color={theme.palette.primary.light}
          />
          <meta name="apple-mobile-web-app-title" content="Pesposa" />
          <meta name="application-name" content="Pesposa" />
          <meta
            name="msapplication-TileColor"
            content={theme.palette.secondary.main}
          />
          <meta name="theme-color" content={theme.palette.common.white} />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
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
          {showSpinner && (
            <div
              id="script-loading-spinner"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Spinner />
            </div>
          )}
          <AfterRoot />
          <AfterData data={data} />
          <script
            type="text/javascript"
            src={assets.client.js}
            async
            defer
            crossOrigin="anonymous"
          />
        </body>
      </html>
    );
  }
}

export default Document;
