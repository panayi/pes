import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import Header from './Header';
import Page from './Page';
import FullHeight from '../lib/components/FullHeight';

export default () => (
  <FullHeight>
    <Header />
    <Page />
  </FullHeight>
);
