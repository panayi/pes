import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
import * as R from 'ramda';
import classNames from 'classnames';
import { isNotNil } from 'ramda-adjunct';
import { withProps } from 'recompose';
import { withStyles } from 'material-ui/styles';
import Sidebar from './Sidebar/Sidebar';
import Page from './Page/Page';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: 'calc(100vh)',
    width: '100%',
    backgroundColor: theme.palette.grey[200],
  },
  hasHeader: {
    marginTop: theme.layout.headerHeight,
    // TODO: Use constant for header height
    minHeight: `calc(100vh - ${theme.layout.headerHeight}px)`,
  },
});

const Layout = ({
  header: Header,
  sidebar: SidebarContent,
  children,
  pageClassName,
  fixed,
  flex,
  wide,
  hasHeader,
  hasSidebar,
  classes,
}) => (
  <div className={classNames(classes.root, { [classes.hasHeader]: hasHeader })}>
    {hasHeader && <Header />}
    {hasSidebar && (
      <Sidebar>
        <SidebarContent />
      </Sidebar>
    )}
    <Page className={pageClassName} fixed={fixed} flex={flex} wide={wide}>
      {children}
    </Page>
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
