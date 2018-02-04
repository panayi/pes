/* @flow */
import React from 'react';
import { Route } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import Sidebar from 'components/atoms/Sidebar';
import Page from 'components/atoms/Page';
import Layout from 'components/organisms/Layout';
import SearchAds from 'components/organisms/SearchAds';
import Ads from './ads';

const styles = theme => ({
  page: {
    display: 'flex',
    justifyContent: 'center',
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

const Home = ({ classes }) => (
  <Layout>
    <Sidebar>
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
    </Sidebar>
    <Page className={classes.page}>
      <Route path="/:category?" component={Ads} />
    </Page>
  </Layout>
);

export default withStyles(styles)(Home);
