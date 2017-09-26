/* @flow */
import React, { Component } from 'react';
import R from 'ramda';
import { Flex, Column, Card, BackgroundImage, Subhead, Badge, Text, Small } from 'rebass';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { postsByCategorySelector } from '../posts';

type Props = {
  categoryName: String,
  posts: Array<Post>,
};

export class Posts extends Component<Props> {
  static defaultProps = {
    posts: [],
  };

  render() {
    const { posts } = this.props;

    return (
      <Flex wrap>
        {
          R.addIndex(R.map)((post, index) => (
            <Column
              key={index}
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
    );
  }
}

export default R.compose(
  firebaseConnect(({ categoryName }) => (
    categoryName
      ? [`posts#orderByChild=category&equalTo=${categoryName}`]
      : ['posts']
  )),
  connect((state, { categoryName }) => ({
    posts: postsByCategorySelector(categoryName)(state),
  })),
)(Posts);
