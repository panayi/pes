/* @flow */
import React from 'react';
import R from 'ramda';
import { Flex, Box, Column, Card, BackgroundImage, Subhead, Badge, Text, Small } from 'rebass';
import withCategories from '../Categories/withCategoriesHoc';
import withPosts from '../Posts/withPostsHoc';

type Props = {
  categories: Array<Category>,
  posts: Array<Post>,
};

const Home = (props: Props) => (
  <Flex mt={4} ml={3}>
    <Box w="300px">
      <Text bold>Categories</Text>
      {R.map(category => (
        <Text key={category.name}>
          {category.name}
        </Text>
      ), props.categories)}
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
        ), props.posts)
      }
    </Flex>
  </Flex>
);

export default R.compose(
  withCategories,
  withPosts,
)(Home);
