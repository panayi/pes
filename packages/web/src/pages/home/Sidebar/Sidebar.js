/* @flow */
import React from 'react';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import SearchFilter from 'modules/Search/Filter';

const styles = theme => ({
  section: {
    marginBottom: theme.spacing.unit,
  },
  title: {
    marginBottom: theme.spacing.unit,
    fontWeight: theme.typography.fontWeightMedium,
  },
});

const HomeSidebar = ({ classes }) => (
  <React.Fragment>
    <Card className={classes.section} elevation={0}>
      <CardContent>
        <Typography className={classes.title}>Location</Typography>
        <SearchFilter.ByLocation />
      </CardContent>
    </Card>
    <Card className={classes.section} elevation={0}>
      <CardContent>
        <Typography className={classes.title}>Categories</Typography>
        <SearchFilter.ByCategory />
      </CardContent>
    </Card>
    <Card className={classes.section} elevation={0}>
      <CardContent>
        <Typography className={classes.title}>Price</Typography>
        <SearchFilter.ByPrice />
      </CardContent>
    </Card>
    <Card className={classes.section} elevation={0}>
      <CardContent>
        <Typography className={classes.title}>Sort by</Typography>
        <SearchFilter.SortBy />
      </CardContent>
    </Card>
  </React.Fragment>
);

export default withStyles(styles)(HomeSidebar);
