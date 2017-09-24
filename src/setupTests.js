/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Provider } from 'react-redux';
import 'jest-enzyme';

global.noop = () => {};

global.withProvider = (children, store) => (
  <Provider store={store}>
    {children}
  </Provider>
);
