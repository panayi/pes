import React from 'react';
import * as R from 'ramda';
import { noop } from 'ramda-adjunct';
import { createStructuredSelector } from 'reselect';
import { withStyles } from 'material-ui/styles';
import {
  selectors as paramsSelectors,
  actions as paramsActions,
} from 'store/search/params';
import connectSearch from 'hocs/connectSearch';
import Button from 'components/Button/Button';
import FilterByCategory from '../FilterByCategory/FilterByCategory';
import FilterByLocation from '../FilterByLocation/FilterByLocation';
import FilterByPrice from '../FilterByPrice/FilterByPrice';
import SortBy from '../SortBy/SortBy';
import Filter from '../Filter/Filter';

const styles = theme => ({
  section: {
    marginBottom: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 1.5,

    [theme.breakpoints.up(theme.map.tablet)]: {
      marginBottom: theme.spacing.unit * 2,
      paddingBottom: 0,
      border: [1, 'solid', theme.palette.divider],
      boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.06)',
    },
  },
  sectionContent: {
    [theme.breakpoints.down(theme.map.phone)]: {
      padding: [theme.spacing.unit * 2, 0, theme.spacing.unit, 0, '!important'],
    },
  },
  sectionTitle: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    marginBottom: theme.spacing.unit,
    fontWeight: theme.typography.fontWeightBold,
  },
  clearButton: {
    padding: 0,
  },
  applyButton: {
    marginRight: theme.spacing.unit,
  },
});

class Filters extends React.Component {
  static defaultProps = {
    DialogTitle: R.always(null),
    DialogContent: React.Fragment,
    DialogActions: R.always(null),
    closeModal: noop,
  };

  componentWillMount() {
    this.initialSearchParams = this.props.searchParams;
  }

  handleCancel = () => {
    this.props.setSearchParams(this.initialSearchParams);
    this.props.closeModal();
  };

  render() {
    const { classes, DialogTitle, DialogContent, closeModal } = this.props;
    return (
      <React.Fragment>
        <DialogTitle
          title="Filters"
          action={
            <Button color="inherit" size="small" onClick={this.handleCancel}>
              Cancel
            </Button>
          }
          secondaryAction={
            <Button
              className={classes.applyButton}
              size="small"
              variant="raised"
              color="primary"
              onClick={() => closeModal()}
            >
              Apply
            </Button>
          }
        />
        <DialogContent>
          <Filter title="Location" filterComponent={FilterByLocation} />
          <Filter title="Categories" filterComponent={FilterByCategory} />
          <Filter title="Price" filterComponent={FilterByPrice} />
          <Filter title="Sort by" filterComponent={SortBy} />
        </DialogContent>
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  searchParams: paramsSelectors.paramsSelector,
});

const mapDispatchToProps = {
  setSearchParams: paramsActions.setParamsFromProps,
};

export default R.compose(
  connectSearch(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(Filters);
