import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty, noop } from 'ramda-adjunct';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import renderNothingWhen from '@pesposa/client-core/src/hocs/renderNothingWhen';
import ListAds from '@pesposa/client-core/src/modules/ListAds/ListAds';
import Search from '@pesposa/client-core/src/modules/Search/Search';

const styles = theme => ({
  title: {
    paddingBottom: theme.spacing.unit * 2,
  },
});

class ListRelatedAds extends React.Component {
  static defaultProps = {
    hitsPerPage: 10,
    maxHits: 30,
  };

  renderContent = searchProps => {
    const { maxHits, className, classes } = this.props;
    const { hits, loadNextPage } = searchProps;

    if (isNilOrEmpty(hits)) {
      return null;
    }

    const finalLoadNextPage = hits.length >= maxHits ? noop : loadNextPage;

    return (
      <div className={className}>
        <Typography
          variant="title"
          color="textSecondary"
          className={classes.title}
        >
          More like this
        </Typography>
        <ListAds
          {...searchProps}
          loadNextPage={finalLoadNextPage}
          sidebarWidth={0}
        />
      </div>
    );
  };

  render() {
    const { ad, adId, hitsPerPage } = this.props;

    return (
      <Search
        params={{
          sortBy: 'default',
          category: ad.category,
          rawProps: {
            query: ad.title,
            removeWordsIfNoResults: 'allOptional',
            hitsPerPage,
            filters: `NOT objectID:${adId}`,
          },
        }}
      >
        {this.renderContent}
      </Search>
    );
  }
}

export default R.compose(
  renderNothingWhen(R.pathSatisfies(isNilOrEmpty, ['ad', 'title'])),
  withStyles(styles),
)(ListRelatedAds);
