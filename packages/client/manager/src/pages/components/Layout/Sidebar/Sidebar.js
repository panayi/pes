import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import NavItem from './NavItem/NavItem';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    marginTop: 64,
  },
  list: {
    flex: 1,
  },
  divider: {
    top: 0,
  },
  title: {
    color: theme.palette.secondary.light,
    '&:hover': {
      color: theme.palette.secondary.dark,
    },
  },
});

const Sidebar = ({ tasksCount, location, classes }) => (
  <div className={classes.root}>
    <List className={classes.list}>
      <NavItem
        title="Tasks"
        openImmediately={R.test(/\/tasks/, location.pathname)}
        depth={0}
      >
        <List>
          <NavItem
            title="Submissions"
            secondaryText={
              tasksCount.submission > 0 ? tasksCount.submission : null
            }
            to="/tasks/submissions"
            depth={1}
          />
          <NavItem
            title="Review Ads"
            secondaryText={tasksCount.reviewAd > 0 ? tasksCount.reviewAd : null}
            to="/tasks/review-ads"
            depth={1}
          />
          <NavItem
            title="Convert External Users"
            secondaryText={
              tasksCount.convertExternalUser > 0
                ? tasksCount.convertExternalUser
                : null
            }
            to="/tasks/convert-external-users"
            depth={1}
          />
        </List>
      </NavItem>
      <NavItem
        title="Data"
        openImmediately={R.test(/\/data/, location.pathname)}
        depth={0}
      >
        <List>
          <NavItem title="Sources" to="/data/sources" depth={1} />
          <NavItem title="ExternalUsers" to="/data/external-users" depth={1} />
        </List>
      </NavItem>
    </List>
    <Toolbar>
      <Divider className={classes.divider} absolute />
      <Typography className={classes.title} variant="button" color="secondary">
        Pesposa Manager v0.1.0
      </Typography>
    </Toolbar>
  </div>
);

Sidebar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default R.compose(
  withRouter,
  withStyles(styles),
)(Sidebar);
