/* @flow */
import React from 'react';
import * as R from 'ramda';
import { noop } from 'ramda-adjunct';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Card, { CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import Filter from '../Filter';

const styles = theme => ({
  section: {
    marginBottom: theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
    },
  },
  sectionContent: {
    [theme.breakpoints.down('md')]: {
      paddingBottom: `${theme.spacing.unit}px !important`,
    },
  },
  title: {
    marginBottom: theme.spacing.unit,
    fontWeight: theme.typography.fontWeightMedium,
  },
  saveButton: {
    marginTop: theme.spacing.unit * 2,
    display: 'none',
    [theme.breakpoints.down(theme.layout.breakpoints.filtersDialog)]: {
      display: 'block',
    },
  },
});

const Filters = ({ classes, renderContent, hideModal }) =>
  renderContent(
    <React.Fragment>
      <Card className={classes.section} elevation={0}>
        <CardContent className={classes.sectionContent}>
          <Typography className={classes.title}>Location</Typography>
          <Filter.ByLocation />
        </CardContent>
      </Card>
      <Card className={classes.section} elevation={0}>
        <CardContent className={classes.sectionContent}>
          <Typography className={classes.title}>Categories</Typography>
          <Filter.ByCategory />
        </CardContent>
      </Card>
      <Card className={classes.section} elevation={0}>
        <CardContent className={classes.sectionContent}>
          <Typography className={classes.title}>Price</Typography>
          <Filter.ByPrice />
        </CardContent>
      </Card>
      <Card className={classes.section} elevation={0}>
        <CardContent className={classes.sectionContent}>
          <Typography className={classes.title}>Sort by</Typography>
          <Filter.SortBy />
        </CardContent>
      </Card>
      <Button
        className={classes.saveButton}
        variant="raised"
        color="primary"
        fullWidth
        onClick={() => hideModal()}
      >
        Save
      </Button>
    </React.Fragment>,
  );

Filters.defaultProps = {
  renderContent: R.identity,
  hideModal: noop,
};

export default withStyles(styles)(Filters);
