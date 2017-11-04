/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { Drawer, List, ListItem, Button } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import Link from 'components/molecules/Link';
import pxToEm from 'config/theme/helpers/pxToEm';

export type LinkType = {
  key: ?String,
  label: String,
  to: String,
};

type Props = {
  links: Array<LinkType>,
  classes: Object,
};

// Based on:
// https://github.com/callemall/material-ui/blob/v1-beta/docs/src/modules/components/AppDrawerNavItem.js

const styles = theme => ({
  sidebar: {
    flex: `0 0 ${theme.custom.sidebarWidth}px`,
  },
  drawerPaper: {
    width: theme.custom.sidebarWidth,
  },
  drawerAnchor: {
    top: 64,
  },
  toolbar: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  button: theme.mixins.gutters({
    borderRadius: 0,
    justifyContent: 'flex-start',
    textTransform: 'none',
    width: '100%',
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      textDecoration: 'none',
    },
  }),
  navLink: {
    fontWeight: theme.typography.fontWeightRegular,
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  navLinkButton: {
    fontSize: `${pxToEm(14)}em`,
  },
});

export class Sidebar extends Component<Props> {
  static defaultProps = {
    categories: [],
  };

  render() {
    const { links, classes } = this.props;

    return (
      <div className={classes.sidebar}>
        <Drawer
          type="permanent"
          classes={{
            paper: classes.drawerPaper,
            paperAnchorDockedLeft: classes.drawerAnchor,
          }}
        >
          <List>
            {R.map(({ key, label, to }) => (
              <ListItem
                key={key || label}
                className={classes.navLink}
                disableGutters
              >
                <Button
                  className={classNames(classes.button, classes.navLinkButton)}
                  component={Link}
                  to={to}
                  variant="button"
                  disableRipple
                >
                  {label}
                </Button>
              </ListItem>
            ), links)}
          </List>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(Sidebar);
