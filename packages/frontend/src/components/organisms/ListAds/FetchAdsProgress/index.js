import React, { Component } from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Typography from 'material-ui/Typography';
import MoodBadIcon from 'material-ui-icons/MoodBad';
import { withStyles } from 'material-ui/styles';
import { selectors as requestSelectors } from 'store/search/request';
import { selectors as totalHitsSelector } from 'store/search/totalHits';
import { selectors as searchSelectors } from 'store/search';
import Spinner from 'components/atoms/Spinner';

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
  },
  noResults: {
    marginTop: theme.spacing.unit,
    maxWidth: 400,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  noResultsIcon: {
    width: 200,
    height: 200,
  },
});

class FetchAdsProgress extends Component {
  renderSpinner() {
    const { isLoading, classes, theme } = this.props;

    return isLoading ? (
      <div className={classes.spinner}>
        <Spinner spinnerColor={theme.palette.primary.A200} />
      </div>
    ) : null;
  }

  renderNoResults() {
    const { noResults, classes } = this.props;

    return noResults ? (
      <div className={classes.noResults}>
        <MoodBadIcon className={classes.noResultsIcon} />
        <Typography type="display3" component="h2" paragraph>
          Oh snap!
        </Typography>
        <Typography type="headline" color="textSecondary">
          No results found, try looking for something different.
        </Typography>
      </div>
    ) : null;
  }

  renderNoMoreResults() {
    const { noMoreResults } = this.props;

    return noMoreResults ? (
      <Typography type="subheading" color="textSecondary">
        End of results
      </Typography>
    ) : null;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.renderSpinner()}
        {this.renderNoResults()}
        {this.renderNoMoreResults()}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLoading: requestSelectors.isRequestPendingSelector,
  noResults: totalHitsSelector.noResultsSelector,
  noMoreResults: searchSelectors.noMoreResultsSelector,
});

export default R.compose(
  connect(mapStateToProps),
  withStyles(styles, { withTheme: true }),
)(FetchAdsProgress);
