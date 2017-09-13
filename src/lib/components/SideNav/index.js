/* @flow */
import React, { Component } from 'react';
import R from 'ramda';
import { Flex, Text } from 'rebass';
import Link from '../Link';

type LinkType = {
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
      <Flex
        w="300px"
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
