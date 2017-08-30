import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { Flex, Box, Column, Card, BackgroundImage, Subhead, Badge, Text, Small } from 'rebass';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

export class Home extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({})),
    posts: PropTypes.arrayOf(PropTypes.shape({})),
  };

  static defaultProps = {
    categories: [],
    posts: [],
  };

  render() {
    const { categories, posts } = this.props;

    return (
      <Flex mt={4} ml={3}>
        <Box w="300px">
          <Text bold>Categories</Text>
          {R.map(category => (
            <Text key={category.name}>
              {category.name}
            </Text>
          ), categories)}
        </Box>
        <Flex wrap>
          {
            R.map(post => (
              <Column
                key={post.oldId + post.categoryChild}
                w="300px"
              >
                <Card
                  href={post.permalink}
                  target="_blank"
                >
                  <BackgroundImage
                    src="http://via.placeholder.com/400x200"
                    alt={post.title}
                  />
                  <Subhead p={2}>
                    {post.title}
                    <Badge>
                      {post.oldId}
                    </Badge>
                  </Subhead>
                  <Small>
                    {post.phone}
                  </Small>
                  <Text dangerouslySetInnerHTML={{ __html: post.body }} />
                </Card>
              </Column>
            ), posts)
          }
        </Flex>
      </Flex>
    );
  }
}

export default R.compose(
  firebaseConnect([
    'categories',
    'posts',
  ]),
  connect(state => ({
    categories: state.firebase.data.categories,
    posts: state.firebase.data.posts,
  })),
)(Home);
