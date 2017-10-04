/* @flow */
import React from 'react';
import R from 'ramda';
import { Card, BackgroundImage, Subhead } from 'rebass';

type Props = {
  post: Post,
  width: Number,
};

const getImage = R.compose(
  R.defaultTo('http://via.placeholder.com/400x200'),
  R.head,
  R.propOr([], 'images'),
);

export default ({ post, width }: Props) => (
  <Card
    href={post.permalink}
    target="_blank"
    width={width}
    mb={3}
  >
    <BackgroundImage
      src={getImage(post)}
      alt={post.title}
    />
    <Subhead
      is="h4"
      p={3}
    >
      {post.title}
    </Subhead>
  </Card>
);
