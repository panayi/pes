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

const styles = theme => ({
  post: {
    textDecoration: 'none',
  },
  postPaperRoot: {
    borderRadius: theme.custom.borderRadius.xl,
  },
  media: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    borderRadius: `${theme.custom.borderRadius.xl}px ${theme.custom.borderRadius.xl}px 0 0`,
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
    classes={{
      root: classes.postPaperRoot,
    }}
    style={{ width }}
    elevation={1}
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
