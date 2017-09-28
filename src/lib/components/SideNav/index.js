/* @flow */
import React, { Component } from 'react';
import R from 'ramda';
import { Flex, Text } from 'rebass';
import Link from '../Link';

export type LinkType = {
  key: ?String,
  label: String,
  to: String,
};

type Props = {
  header: String,
  links: Array<LinkType>,
  width: String,
};

export class SideNav extends Component<Props> {
  static defaultProps = {
    categories: [],
  };

  render() {
    const { header, links, width } = this.props;

    return (
      <Flex
        w={width}
        column
      >
        <Text bold>{header}</Text>
        {R.map(({ key, label, to }) => (
          <Link
            key={key || label}
            to={to}
          >
            {label}
          </Link>
        ), links)}
      </Flex>
    );
  }
}

export default SideNav;
