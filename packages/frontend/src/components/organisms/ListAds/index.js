/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { connectInfiniteHits } from 'react-instantsearch/connectors';
import { withProps } from 'recompose';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Masonry from 'react-masonry-infinite';
import id from 'utils/id';
import theme from 'config/theme';
import Spinner from 'components/atoms/Spinner';
import AdCard from 'components/molecules/AdCard';
import { sizesSelector } from './utils';

type Props = {
  hits: Array<Ad>,
  refine: Function,
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

export class ListAds extends Component<Props> {
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

  masonry: ?Object;

  render() {
    const { hits, hasMore, refine, sizes, classes } = this.props;

    return (
      <div>
        <Masonry
          ref={instance => {
            this.masonry = instance;
          }}
          hasMore={hasMore}
          loadMore={refine}
          sizes={sizes}
          loader={
            <Grid container justify="center" className={classes.vspacing}>
              <Spinner spinnerColor={theme.palette.primary.A200} />
            </Grid>
          }
        >
          {R.map(
            ad => <AdCard key={id(ad)} ad={ad} width={COLUMN_WIDTH} />,
            hits,
          )}
        </Masonry>
        {!hasMore && (
          <Grid container justify="center" className={classes.vspacing}>
            <Typography type="subheading" color="textSecondary">
              End of results
            </Typography>
          </Grid>
        )}
      </div>
    );
  }
}

export default R.compose(
  connectInfiniteHits,
  withProps({
    sizes: sizesSelector({
      columnWidth: COLUMN_WIDTH,
      gutter: GUTTER,
      maxScreenWidth: 5000,
      wastedWidth: theme.custom.sidebarWidth + 2 * GUTTER,
    }),
  }),
  withStyles(styles),
)(ListAds);