/* @flow */
import React from 'react';
import R from 'ramda';
import { Card, BackgroundImage, Subhead, Absolute, Badge } from 'rebass';
import randomInt from '../../lib/helpers/randomInt';

type Props = {
  post: Post,
  width: Number,
};

const getPlaceholderImage = () => (
  `https://unsplash.it/${randomInt(1, 7) * 100}/${randomInt(1, 7) * 100}/?random`
);

const getImage = R.compose(
  url => R.defaultTo(getPlaceholderImage(), url),
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
      style={{ position: 'relative' }}
    >
      {
        post.price && post.price > 0 &&
          <Absolute
            bottom
            left
            ml={2}
            mb={2}
            color="white"
          >
            <Badge>
              €&nbsp;{post.price}
            </Badge>
          </Absolute>
      }
    </BackgroundImage>
    <Subhead
      is="h4"
      p={3}
    >
      {post.title}
    </Subhead>
  </Card>
);
