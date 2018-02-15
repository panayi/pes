/* @flow */
import React from 'react';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import SearchAds from 'modules/Search/SearchAds';

const styles = theme => ({
  page: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
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
        <SearchAds.Filter.ByLocation />
      </CardContent>
    </Card>
    <Card className={classes.section} elevation={0}>
      <CardContent>
        <Typography className={classes.title}>Categories</Typography>
        <SearchAds.Filter.ByCategory />
      </CardContent>
    </Card>
    <Card className={classes.section} elevation={0}>
      <CardContent>
        <Typography className={classes.title}>Price</Typography>
        <SearchAds.Filter.ByPrice />
      </CardContent>
    </Card>
    <Card className={classes.section} elevation={0}>
      <CardContent>
        <Typography className={classes.title}>Sort by</Typography>
        <SearchAds.Filter.SortBy />
      </CardContent>
    </Card>
  </React.Fragment>
);

export default withStyles(styles)(HomeSidebar);
