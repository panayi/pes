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
import { constants as searchConstants } from 'store/search';
import SearchProvider from 'components/SearchProvider/SearchProvider';
import Pages from './pages';

const jss = create({ plugins: [...jssPreset().plugins, jssExpand()] });
const generateClassName = createGenerateClassName();

const App = ({ store }) => (
  <ConnectedRouter history={store.history}>
    <SearchProvider id={searchConstants.HOME_SEARCH_ID}>
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <Pages />
        </MuiThemeProvider>
      </JssProvider>
    </SearchProvider>
  </ConnectedRouter>
);

export default App;
