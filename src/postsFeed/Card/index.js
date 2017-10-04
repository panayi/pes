/* @flow */
import React from 'react';
import R from 'ramda';
import { Card, BackgroundImage, Subhead, Absolute, Badge, Text, Small } from 'rebass';
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
      pb={0}
      center
    >
      {post.title}
    </Subhead>
    {
      post.address &&
        <Text
          bold
          center
          p={3}
          pt={1}
          color="#aaa"
        >
          <Small>
            {post.address}
          </Small>
        </Text>
    }
  </Card>
);
