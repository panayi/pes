import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import HomeIcon from 'material-ui-icons/Home';
import translate from 'hocs/translate';
import Link from 'components/Link/Link';
import AdAddress from 'components/AdAddress/AdAddress';
import AdTitle from 'components/AdTitle/AdTitle';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  homeButton: {
    minWidth: 80,
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
  linkItem: {
    padding: 0,
    minWidth: 0,
    '&:hover': {
      background: 'none',
    },
  },
  separator: {
    margin: [0, theme.spacing.unit / 2],
    color: theme.palette.text.secondary,
  },
  ellipsis: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
});

const BreadCrumbs = ({ ad, t, classes }) => (
  <div className={classes.root}>
    <Link to="/" className={classes.homeButton} size="small" variant="raised">
      <HomeIcon className={classes.icon} />Home
    </Link>
    <Typography className={classes.separator}>/</Typography>
    <AdAddress ad={ad}>
      {({ address }) =>
        address ? (
          <Typography className={classes.item}>{address}</Typography>
        ) : null
      }
    </AdAddress>
    <Typography className={classes.separator}>/</Typography>
    <Link to={`/${ad.category}`} className={classes.linkItem}>
      {t(ad.category)}
    </Link>
    <Typography className={classes.separator}>/</Typography>
    <AdTitle className={classNames(classes.item, classes.ellipsis)} ad={ad} />
  </div>
);

export default R.compose(translate('categories'), withStyles(styles))(
  BreadCrumbs,
);
