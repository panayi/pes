/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { Toolbar, List, ListItem, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import Link from '../Link';

export type LinkType = {
  key: ?String,
  label: String,
  to: String,
};

type Props = {
  links: Array<LinkType>,
  classes: Object,
  width: number,
};

const styles = {
  toolbar: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  link: {
    justifyContent: 'left',
  },
};

export class SideNav extends Component<Props> {
  static defaultProps = {
    categories: [],
  };

  render() {
    const { links, classes, width } = this.props;

    return (
      <div
        style={{ width }}
      >
        <Toolbar className={classes.toolbar}>
          <List>
            {R.map(({ key, label, to }) => (
              <ListItem
                key={key || label}
                disableGutters
              >
                <Link
                  to={to}
                  className={classes.link}
                >
                  {label}
                </Link>
              </ListItem>
            ), links)}
          </List>
        </Toolbar>
      </div>
    );
  }
}

export default withStyles(styles)(SideNav);
