import React, { Component } from 'react';
import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import Typography from '@material-ui/core/Typography';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import withStyles from '@material-ui/core/styles/withStyles';
import { selectors as requestSelectors } from '../../../store/search/request';
import { selectors as pagesCountSelectors } from '../../../store/search/pagesCount';
import { selectors as searchSelectors } from '../../../store/search';
import connectSearch from '../../../hocs/connectSearch';
import EmptyHero from '../../../components/EmptyHero/EmptyHero';
import Spinner from '../../../components/Spinner/Spinner';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 64,
    marginTop: 3 * theme.spacing.unit,
    '> div + div': {
      marginTop: 2 * theme.spacing.unit,
    },
    [theme.breakpoints.down(theme.map.tablet)]: {
      minHeight: 0,
      marginTop: 1 * theme.spacing.unit,
      marginBottom: 8 * theme.spacing.unit,
    },
  },
  noResults: {
    marginTop: theme.spacing.unit,
    maxWidth: 600,
    color: theme.palette.text.secondary,
  },
  spinner: {
    overflow: 'hidden',
  },
});

class FetchAdsProgress extends Component {
  renderContent() {
    const {
      showIsLoading,
      isLoading,
      hideIsLoading,
      showNoResults,
      hasNoResults,
      hideNoResults,
      noMoreResults,
      hideNoMoreResults,
      noResults,
      classes,
    } = this.props;

    if (!hideIsLoading && (showIsLoading || isLoading)) {
      return (
        <div className={classes.spinner}>
          <Spinner />
        </div>
      );
    }

    if (!hideNoResults && (showNoResults || hasNoResults)) {
      return (
        <div className={classes.noResults}>
          {noResults || (
            <EmptyHero
              icon={MoodBadIcon}
              title="Oh snap!"
              tagline="No results found, try looking for something different."
            />
          )}
        </div>
      );
    }

    if (!hideNoMoreResults && noMoreResults) {
      return (
        <Typography variant="subheading" color="textSecondary">
          End of results
        </Typography>
      );
    }

    return null;
  }

  render() {
    const { classes } = this.props;

    return <div className={classes.root}>{this.renderContent()}</div>;
  }
}

const mapStateToProps = createStructuredSelector({
  isLoading: requestSelectors.isRequestPendingSelector,
  hasNoResults: pagesCountSelectors.noResultsSelector,
  noMoreResults: searchSelectors.noMoreResultsSelector,
});

export default R.compose(
  connectSearch(mapStateToProps),
  withStyles(styles),
)(FetchAdsProgress);
