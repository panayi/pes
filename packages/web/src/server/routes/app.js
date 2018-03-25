import React from 'react';
import { renderToString } from 'react-dom/server';
import { mobileParser, setMobileDetect } from 'react-responsive-redux';
import { render } from '@jaredpalmer/after';
import { Provider } from 'react-redux';
import routes from 'routes';
import Document from '../Document';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST); // eslint-disable-line import/no-dynamic-require

const app = async (req, res) => {
  try {
    const { store } = res.locals;

    // Detect mobile
    const mobileDetect = mobileParser(req);
    store.dispatch(setMobileDetect(mobileDetect));

    const customRenderer = node => {
      const App = <Provider store={store}>{node}</Provider>;
      const html = renderToString(App);
      return { html, store };
    };

    const html = await render({
      req,
      res,
      document: Document,
      routes,
      assets,
      customRenderer,
      store,
    });
    res.send(html);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    res.json(error);
  }
};

export default app;
