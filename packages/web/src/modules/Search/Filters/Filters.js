/* @flow */
import React from 'react';
import * as R from 'ramda';
import { noop } from 'ramda-adjunct';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import Button from 'components/Button/Button';
import Filter from '../Filter';

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
  title: {
    marginBottom: theme.spacing.unit,
    fontWeight: theme.typography.fontWeightBold,
  },
});

const Filters = ({ classes, DialogTitle, DialogContent, closeModal }) => (
  <React.Fragment>
    <DialogTitle
      title="Filters"
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
