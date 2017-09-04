/* @flow */
import React, { Component } from 'react';
import R from 'ramda';
import { Flex, Column, Card, BackgroundImage, Subhead, Badge, Text, Small } from 'rebass';
import { withProps } from 'recompose';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

type Props = {
  posts: Array<Post>,
};

export class Home extends Component<Props> {
  static defaultProps = {
    posts: [],
  };

  render() {
    const { posts } = this.props;

    return (
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
    );
  }
}

export default R.compose(
  withProps((props: Props) => ({
    categoryName: R.path(['match', 'params', 'categoryName'], props),
  })),
  firebaseConnect(({ categoryName }) => (
    categoryName
      ? [
        `posts#orderByChild=category&equalTo=${categoryName}`,
      ]
      : [
        'posts',
      ]
  )),
  connect((state, { categoryName }) => ({
    posts: R.compose(
      R.filter((post) => {
        if (!post || (categoryName && !R.equals(post.category, categoryName))) {
          return false;
        }

        return true;
      }),
      // FIXME: For some reason when querying (i.e., when categoryName is defined),
      // it returns an object instead of an array. Below line ensures `posts` is an array.
      R.values,
      R.pathOr({}, ['firebase', 'data', 'posts']),
    )(state),
  })),
)(Home);
