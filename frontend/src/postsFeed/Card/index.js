/* @flow */
import React from 'react';
import { Card, BackgroundImage, Subhead } from 'rebass';

type Props = {
  post: Post,
  width: Number,
};

export default ({ post, width }: Props) => (
  <Card
    href={post.permalink}
    target="_blank"
    width={width}
    mb={3}
  >
    <BackgroundImage
      src="http://via.placeholder.com/400x200"
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
