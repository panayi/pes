import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import Header from './header';
import Page from './page';
import FullHeight from '../lib/components/FullHeight';

export default () => (
  <FullHeight>
    <Header />
    <Page />
  </FullHeight>
);
