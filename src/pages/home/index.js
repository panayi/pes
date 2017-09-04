/* @flow */
import React, { Component } from 'react';
import R from 'ramda';
import { Route } from 'react-router-dom';
import { Flex, Text } from 'rebass';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import Link from '../../lib/components/Link';
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

export default R.compose(
  firebaseConnect([
    'categories',
  ]),
  connect((state: Object): Object => ({
    categories: state.firebase.data.categories,
  })),
)(Home);
