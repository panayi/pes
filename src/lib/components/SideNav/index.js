/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { List, ListItem, Typography } from 'material-ui';
import Link from '../Link';

export type LinkType = {
  key: ?String,
  label: String,
  to: String,
};

type Props = {
  header: String,
  links: Array<LinkType>,
};

export class SideNav extends Component<Props> {
  static defaultProps = {
    categories: [],
  };

  render() {
    const { header, links } = this.props;

    return (
      <List>
        <Typography>{header}</Typography>
        {R.map(({ key, label, to }) => (
          <ListItem
            button
            component={Link}
            key={key || label}
            to={to}
          >
            {label}
          </ListItem>
        ), links)}
      </List>
    );
  }
}

export default SideNav;
