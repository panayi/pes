/* @flow */
import React from 'react';
import { withStyles } from 'material-ui/styles';
import Sidebar from './Sidebar/Sidebar';
import Page from './Page/Page';

type Props = {
  header: Class<React$Component<*>>,
  sidebar: Class<React$Component<*>>,
  children: React$Node,
  classes: Object,
  // Page props
  pageClassName: ?string,
  fixed: ?boolean,
  flex: ?boolean,
  wide: ?boolean,
};

const styles = theme => ({
  '@global': {
    body: {
      marginTop: theme.layout.headerHeight,
    },
  },
  root: {
    display: 'flex',
    alignItems: 'stretch',
    // TODO: Use constant for header height
    minHeight: `calc(100vh - ${theme.layout.headerHeight}px)`,
    width: '100%',
    backgroundColor: theme.palette.grey[200],
  },
});

const Layout = ({
  header: Header,
  sidebar: SidebarContent,
  children,
  classes,
  pageClassName,
  fixed,
  flex,
  wide,
}: Props) => (
  <div className={classes.root}>
    <Header />
    {SidebarContent ? (
      <Sidebar>
        <SidebarContent />
      </Sidebar>
    ) : null}
    <Page className={pageClassName} fixed={fixed} flex={flex} wide={wide}>
      {children}
    </Page>
  </div>
);

export default withStyles(styles)(Layout);
