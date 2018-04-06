import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { isNotNil } from 'ramda-adjunct';
import classNames from 'classnames';
import { withProps } from 'recompose';
import withStyles from '@material-ui/core/styles/withStyles';
import ReduxModal from '../../components/Modal/ReduxModal/ReduxModal';
import Login from '../../modules/Login/Login';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Page from './Page/Page';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: '#f0f1f2',
    },
    'html,body,#root,#root2,#root > div,#root2 > div': {
      height: '100%',
    },
  },
  root: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100%',
    width: '100%',
  },
  hasHeader: {
    marginTop: theme.layout.headerHeight.tablet,
    [theme.breakpoints.down(theme.map.phone)]: {
      marginTop: theme.layout.headerHeight.phone,
    },
  },
});

const Layout = ({
  header,
  sidebar,
  children,
  pageClassName,
  headerClasses,
  sidebarClassName,
  fixed,
  flex,
  wide,
  hasHeader,
  hasSidebar,
  classes,
}) => (
  <div className={classes.root}>
    {hasHeader && <Header classes={headerClasses}>{header}</Header>}
    {hasSidebar && <Sidebar className={sidebarClassName}>{sidebar}</Sidebar>}
    <Page
      className={classNames(pageClassName, {
        [classes.hasHeader]: hasHeader,
      })}
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
  header: PropTypes.node,
  sidebar: PropTypes.node,
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
