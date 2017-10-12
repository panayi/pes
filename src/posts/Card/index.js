/* @flow */
import React from 'react';
import * as R from 'ramda';
import { Card, CardMedia, CardHeader, CardContent, Typography, withStyles } from 'material-ui';
import { Link } from 'react-router-dom';
import randomInt from '../../lib/helpers/randomInt';

type Props = {
  post: Post,
  width: Number,
  classes: Object,
};

const styles = {
  media: {
    minHeight: '200px',
  },
};

const getPlaceholderImage = () => (
  `https://unsplash.it/${randomInt(1, 7) * 100}/${randomInt(1, 7) * 100}/?random`
);

const getImage = R.compose(
  url => R.defaultTo(getPlaceholderImage(), url),
  R.head,
  R.propOr([], 'images'),
);

const PostCard = ({ post, width, classes }: Props) => (
  <Card
    style={{ width }}
    component={Link}
    to={`/i/${post.objectID}`}
  >
    <CardMedia
      className={classes.media}
      image={getImage(post)}
      title={post.title}
      style={{ position: 'relative' }}
    >
      {
        post.price && post.price > 0 &&
          <span>
            €&nbsp;{post.price}
          </span>
      }
    </CardMedia>
    <CardHeader title={post.title} />
    <CardContent>
      {
        post.address &&
          <Typography
            type="caption"
            align="center"
          >
            {post.address}
          </Typography>
      }
    </CardContent>
  </Card>
);

export default withStyles(styles)(PostCard);
