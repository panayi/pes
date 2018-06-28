import React from 'react';
import * as R from 'ramda';
import { noop } from 'ramda-adjunct';
import { createStructuredSelector } from 'reselect';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  selectors as paramsSelectors,
  actions as paramsActions,
} from '../../../store/search/params';
import connectSearch from '../../../hocs/connectSearch';
import Button from '../../../components/Button/Button';
import FindUsOnFacebookButton from '../../../components/FindUsOnFacebookButton/FindUsOnFacebookButton';
import FilterByCategory from '../FilterByCategory/FilterByCategory';
import FilterByLocation from '../FilterByLocation/FilterByLocation';
import FilterByPrice from '../FilterByPrice/FilterByPrice';
import SortBy from '../SortBy/SortBy';
import Filter from '../Filter/Filter';

const styles = theme => ({
  title: {
    marginBottom: theme.spacing.unit,
    fontWeight: theme.typography.fontWeightBold,
  },
  clearButton: {
    marginLeft: theme.spacing.unit,
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

  componentDidMount() {
    const { searchParams } = this.props;
    this.initialSearchParams = searchParams;
  }

  handleCancel = () => {
    const { setSearchParams, closeModal } = this.props;
    setSearchParams(this.initialSearchParams);
    closeModal();
  };

  render() {
    const { classes, DialogTitle, DialogContent, closeModal } = this.props;

    return (
      <React.Fragment>
        <DialogTitle
          title="Filters"
          action={
            <Button
              className={classes.clearButton}
              color="inherit"
              size="small"
              onClick={this.handleCancel}
            >
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
          <FindUsOnFacebookButton />
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
