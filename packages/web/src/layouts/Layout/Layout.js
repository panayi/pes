import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
import * as R from 'ramda';
import classNames from 'classnames';
import { isNotNil } from 'ramda-adjunct';
import { withProps } from 'recompose';
import withStyles from 'material-ui/styles/withStyles';
import ReduxModal from 'components/Modal/ReduxModal/ReduxModal';
import Login from 'modules/Login/Login';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Page from './Page/Page';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: '#f0f1f2',
    },
  },
  root: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: 'calc(100vh)',
    width: '100%',
  },
  hasHeader: {
    marginTop: theme.layout.headerHeight.phone,
    [theme.breakpoints.up(theme.map.tablet)]: {
      marginTop: theme.layout.headerHeight.tablet,
    },
  },
});

const Layout = ({
  header: HeaderContent,
  sidebar: SidebarContent,
  children,
  pageClassName,
  headerClassName,
  sidebarClassName,
  fixed,
  flex,
  wide,
  hasHeader,
  hasSidebar,
  classes,
}) => (
  <div className={classes.root}>
    {hasHeader && (
      <Header className={headerClassName}>
        <HeaderContent />
      </Header>
    )}
    {hasSidebar && (
      <Sidebar className={sidebarClassName}>
        <SidebarContent />
      </Sidebar>
    )}
    <Page
      className={classNames(pageClassName, { [classes.hasHeader]: hasHeader })}
      fixed={fixed}
      flex={flex}
      wide={wide}
    >
      {children}
    </Page>
    <ReduxModal id="login" content={Login} />
  </div>
);

Layout.propTypes = {
  header: elementType,
  sidebar: elementType,
  children: PropTypes.node,
  pageClassName: PropTypes.string,
  fixed: PropTypes.bool,
  flex: PropTypes.bool,
  wide: PropTypes.bool,
  classes: PropTypes.shape({}).isRequired,
};

Layout.defaultProps = {
  header: null,
  sidebar: null,
  children: null,
  pageClassName: null,
  fixed: false,
  flex: false,
  wide: false,
};

export default R.compose(
  withProps(({ header, sidebar }) => ({
    hasHeader: isNotNil(header),
    hasSidebar: isNotNil(sidebar),
  })),
  withStyles(styles),
)(Layout);
