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
    marginBottom: theme.spacing.unit * 2,
    border: [1, 'solid', theme.palette.divider],
    boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.06)',
    [theme.breakpoints.down(theme.map.tablet)]: {
      marginBottom: 0,
    },
  },
  sectionContent: {
    [theme.breakpoints.down(theme.map.laptop)]: {
      paddingBottom: `${theme.spacing.unit}px !important`,
    },
  },
  title: {
    marginBottom: theme.spacing.unit,
    fontWeight: theme.typography.fontWeightMedium,
  },
});

const Filters = ({ classes, DialogTitle, DialogContent, closeModal }) => (
  <React.Fragment>
    <DialogTitle
      mobileTitle="Filters"
      secondaryAction={
        <Button color="inherit" size="small" onClick={() => closeModal()}>
          Save
        </Button>
      }
    />
    <DialogContent>
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
    </DialogContent>
  </React.Fragment>
);

Filters.defaultProps = {
  DialogTitle: R.always(null),
  DialogContent: React.Fragment,
  DialogActions: R.always(null),
  closeModal: noop,
};

export default withStyles(styles)(Filters);
