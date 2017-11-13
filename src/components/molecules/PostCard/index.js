/* @flow */
import React from 'react';
import { Card, CardMedia, CardHeader, CardContent, Typography, withStyles } from 'material-ui';
import { Link } from 'react-router-dom';
import { getMediaProps } from './utils';

// TODO: this needs to be broken into several molecules

type Props = {
  post: Post,
  width: Number,
  classes: Object,
};

const DEFAULT_MEDIA_HEIGHT = 200;
const HEADER_HEIGHT = 60;
const CONTENT_HEIGHT = 30;

const styles = theme => ({
  root: {
    display: 'flex',
  },
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
    padding: theme.spacing.unit,
    height: HEADER_HEIGHT,
    boxSizing: 'border-box',
    overflow: 'hidden',
    textAlign: 'center',
  },
  content: {
    padding: 0,
    height: CONTENT_HEIGHT,
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  headerTitle: {
    fontSize: theme.typography.subheading.fontSize,
  },
});

const PostCard = ({ post, width, classes }: Props) => {
  const mediaProps = getMediaProps(post, { defaultHeight: DEFAULT_MEDIA_HEIGHT });
  const totalHeight = mediaProps.style.height + HEADER_HEIGHT + CONTENT_HEIGHT;

  return (
    <div
      className={classes.root}
      style={{ width: `${width}px`, height: `${totalHeight}px` }}
    >
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
          {...getMediaProps(post, { defaultHeight: DEFAULT_MEDIA_HEIGHT })}
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
        <CardContent className={classes.content}>
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
    </div>
  );
};

export default withStyles(styles)(PostCard);
