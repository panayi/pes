import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import renderNothingWhen from 'hocs/renderNothingWhen';
import ListAds from 'components/ListAds/ListAds';
import Search from 'modules/Search/Search';

const styles = theme => ({
  title: {
    paddingBottom: theme.spacing.unit * 2,
  },
});

const ListRelatedAds = ({ ad, adId, classes }) => (
  <Search
    params={{
      sortBy: 'default',
      category: ad.category,
      rawProps: {
        query: ad.title,
        optionalWords: R.split(' ', ad.title),
        hitsPerPage: 10,
        filters: `NOT objectID:${adId}`,
      },
    }}
  >
    {props =>
      isNilOrEmpty(props.hits) ? null : (
        <React.Fragment>
          <Typography
            variant="title"
            color="textSecondary"
            className={classes.title}
          >
            More like this
          </Typography>
          <ListAds {...props} sidebarWidth={0} />
        </React.Fragment>
      )
    }
  </Search>
);

export default R.compose(
  renderNothingWhen(R.pathSatisfies(isNilOrEmpty, ['ad', 'title'])),
  withStyles(styles),
)(ListRelatedAds);
