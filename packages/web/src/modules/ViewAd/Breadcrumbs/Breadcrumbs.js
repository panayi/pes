import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import HomeIcon from 'material-ui-icons/Home';
import Link from 'components/Link/Link';
import AdAddress from 'components/AdAddress/AdAddress';
import AdTitle from 'components/AdTitle/AdTitle';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  homeButton: {
    minHeight: 0,
    padding: [theme.spacing.unit / 2, theme.spacing.unit],
    boxShadow: 'none',
    background: 'white',
    borderRadius: '50em',
    color: theme.palette.primary.main,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: theme.spacing.unit / 2,
  },
  item: {
    color: theme.palette.text.secondary,
  },
  separator: {
    margin: [0, 10],
    color: theme.palette.text.secondary,
  },
});

const BreadCrumbs = ({ ad, classes }) => (
  <div className={classes.root}>
    <Link to="/" className={classes.homeButton} size="small" variant="raised">
      <HomeIcon className={classes.icon} />Home
    </Link>
    <Typography className={classes.separator}>/</Typography>
    <AdAddress className={classes.item} ad={ad} />
    <Typography className={classes.separator}>/</Typography>
    <Typography className={classes.item}>{ad.category}</Typography>
    <Typography className={classes.separator}>/</Typography>
    <AdTitle className={classes.item} ad={ad} />
  </div>
);

export default withStyles(styles)(BreadCrumbs);
