/* @flow */
import React, { Component } from 'react';
import R from 'ramda';
import { Route } from 'react-router-dom';
import { Flex, Text } from 'rebass';
import Link from '../../lib/components/Link';
import withCategories from '../../categories/withCategoriesHoc';
import Posts from './posts';

type Props = {
  categories: Array<Category>,
};

export class Home extends Component<Props> {
  static defaultProps = {
    categories: [],
  };

  render() {
    const { categories } = this.props;

    return (
      <Flex
        mt={4}
        ml={3}
      >
        <Flex
          w="300px"
          column
        >
          <Text bold>Categories</Text>
          {R.map(({ name }) => (
            <Link
              key={name}
              to={`/${name}`}
            >
              {name}
            </Link>
          ), categories)}
        </Flex>
        <Route
          path="/:categoryName?"
          component={Posts}
        />
      </Flex>
    );
  }
}

export default withCategories(Home);
