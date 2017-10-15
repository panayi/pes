/* @flow */
import React from 'react';
import { Card, CardMedia, CardHeader, CardContent, Typography, withStyles } from 'material-ui';
import { Link } from 'react-router-dom';
import { getMediaProps } from './card';

type Props = {
  post: Post,
  width: Number,
  classes: Object,
};

const DEFAULT_HEIGHT = 200;

const styles = theme => !console.log(theme) && ({
  post: {
    textDecoration: 'none',
  },
  media: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  price: {
    padding: theme.spacing.unit,
  },
  header: {
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: theme.typography.title.fontSize,
  },
});

const PostCard = ({ post, width, classes }: Props) => (
  <Card
    className={classes.post}
    style={{ width }}
    component={Link}
    to={`/i/${post.objectID}`}
  >
    <CardMedia
      className={classes.media}
      title={post.title}
      {...getMediaProps(post, { defaultHeight: DEFAULT_HEIGHT })}
    >
      {
        post.price && post.price > 0 &&
          <Typography
            className={classes.price}
            color="accent"
            type="title"
          >
            €&nbsp;{post.price}
          </Typography>
      }
    </CardMedia>
    <CardHeader
      className={classes.header}
      classes={{
        title: classes.headerTitle,
      }}
      title={post.title}
    />
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
