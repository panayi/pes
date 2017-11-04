/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { Drawer, List, ListItem, ListItemText } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import Link from 'components/molecules/Link';

export type LinkType = {
  key: ?String,
  label: String,
  to: String,
};

type Props = {
  links: Array<LinkType>,
  classes: Object,
};

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
                button
                key={key || label}
                component={Link}
                to={to}
                disableGutters
              >
                <ListItemText primary={label} />
              </ListItem>
            ), links)}
          </List>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(Sidebar);
