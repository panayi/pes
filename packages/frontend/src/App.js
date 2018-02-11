import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { create } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import jssExpand from 'jss-expand';
import {
  MuiThemeProvider,
  createGenerateClassName,
  jssPreset,
} from 'material-ui/styles';
import 'normalize.css/normalize.css';
import theme from 'config/theme';
import ModalProvider from 'components/molecules/ModalProvider';
import Pages from './pages';

const jss = create({ plugins: [...jssPreset().plugins, jssExpand()] });
const generateClassName = createGenerateClassName();

const App = ({ store }) => (
  <ConnectedRouter history={store.history}>
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <Pages />
        <ModalProvider />
      </MuiThemeProvider>
    </JssProvider>
  </ConnectedRouter>
);

export default App;
