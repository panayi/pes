/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { Grid, Typography, withStyles } from 'material-ui';
import Masonry from 'react-masonry-infinite';
import Spinner from 'react-spinkit';
import theme from 'config/theme';
import PostCard from 'components/molecules/PostCard';
import { sizesSelector } from './utils';

type Props = {
  hits: Array<Post>,
  loadMore: Function,
  hasMore: Boolean,
  sizes: Array<Object>,
  classes: Object,
};

const COLUMN_WIDTH = 290;
const GUTTER = 10;

const styles = t => ({
  vspacing: {
    marginTop: t.spacing.unit * 3,
    marginBottom: t.spacing.unit * 1,
  },
});

export class PostsList extends Component<Props> {
  static defaultProps = {
    hits: [],
  };

  // TODO: Find a way to avoid this
  // Seems it's only needed when changing filter (categories),
  // not when loading more.
  componentDidUpdate(prevProps: Props) {
    // If the search hits have changed,
    // force Masonry to recalulate layout
    if (this.masonry && !R.equals(prevProps.hits, this.props.hits)) {
      this.masonry.forcePack();
    }
  }

  masonry: ?Object

  render() {
    const { hits, hasMore, loadMore, sizes, classes } = this.props;

    return (
      <div>
        <Masonry
          ref={(instance) => { this.masonry = instance; }}
          hasMore={hasMore}
          loadMore={loadMore}
          sizes={sizes}
          loader={
            <Grid
              container
              justify="center"
              className={classes.vspacing}
            >
              <Spinner
                name="wordpress"
                color={theme.palette.primary.A200}
              />
            </Grid>
          }
        >
          {
            R.map(post => (
              <PostCard
                key={post.objectID}
                post={post}
                width={COLUMN_WIDTH}
              />
            ), hits)
          }
        </Masonry>
        {
          !hasMore &&
            <Grid
              container
              justify="center"
              className={classes.vspacing}
            >
              <Typography type="subheading" color="secondary">
                End of results
              </Typography>
            </Grid>
        }
      </div>
    );
  }
}

export default R.compose(
  withProps({
    sizes: sizesSelector({
      columnWidth: COLUMN_WIDTH,
      gutter: GUTTER,
      maxScreenWidth: 5000,
      wastedWidth: theme.custom.sidebarWidth + (2 * GUTTER),
    }),
  }),
  withStyles(styles),
)(PostsList);
