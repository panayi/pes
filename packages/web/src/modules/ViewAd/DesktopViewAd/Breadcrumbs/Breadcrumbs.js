import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import HomeIcon from 'material-ui-icons/Home';
import translate from 'hocs/translate';
import Link from 'components/Link/Link';
import AdPlace from 'components/AdPlace/AdPlace';
import AdTitle from 'components/AdTitle/AdTitle';
import BreakWord from 'components/BreakWord/BreakWord';
import BackToListButton from '../../BackToListButton/BackToListButton';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: theme.spacing.unit / 2,
  },
  homeButton: {
    minWidth: 80,
    minHeight: 0,
    padding: [theme.spacing.unit / 2, theme.spacing.unit],
    marginTop: -theme.spacing.unit / 2,
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
    minHeight: 0,
    lineHeight: '1.46429em', // TODO: refactor
    '&:hover': {
      background: 'none',
    },
  },
  separator: {
    margin: [0, theme.spacing.unit / 2],
    color: theme.palette.text.secondary,
  },
  title: {
    flex: 1,
  },
});

const BreadCrumbs = ({ ad, t, classes }) => (
  <div className={classes.root}>
    <BackToListButton
      className={classes.homeButton}
      size="small"
      variant="raised"
    >
      <HomeIcon className={classes.icon} />Home
    </BackToListButton>
    <Typography className={classes.separator}>/</Typography>
    <AdPlace ad={ad}>
      {({ place }) =>
        place ? <Typography className={classes.item}>{place}</Typography> : null
      }
    </AdPlace>
    <Typography className={classes.separator}>/</Typography>
    <Link to={`/${ad.category}`} className={classes.linkItem}>
      {t(ad.category)}
    </Link>
    <Typography className={classes.separator}>/</Typography>
    <BreakWord
      component={AdTitle}
      className={classNames(classes.item, classes.title)}
      ad={ad}
    />
  </div>
);

export default R.compose(translate('categories'), withStyles(styles))(
  BreadCrumbs,
);
