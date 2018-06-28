import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import HomeIcon from '@material-ui/icons/Home';
import translate from '@pesposa/client-core/src/hocs/translate';
import Link from '@pesposa/client-core/src/components/Link/Link';
import AdPlace from '@pesposa/client-core/src/modules/Ad/AdPlace/AdPlace';
import AdTitle from '@pesposa/client-core/src/modules/Ad/AdTitle/AdTitle';
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
  linkItemWrap: {
    lineHeight: 1,
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
    <AdPlace ad={ad}>
      {({ place }) =>
        place ? (
          <React.Fragment>
            <Typography className={classes.separator}>/</Typography>
            <Typography className={classes.item} component="h2">
              {place}
            </Typography>
          </React.Fragment>
        ) : null
      }
    </AdPlace>
    {ad.category ? (
      <React.Fragment>
        <Typography className={classes.separator}>/</Typography>
        <Typography component="h2" className={classes.linkItemWrap}>
          <Link to={`/c/${ad.category}`} className={classes.linkItem}>
            {t(ad.category)}
          </Link>
        </Typography>
      </React.Fragment>
    ) : null}
    {ad.title ? (
      <React.Fragment>
        <Typography className={classes.separator}>/</Typography>
        <BreakWord
          component={AdTitle}
          className={classNames(classes.item, classes.title)}
          ad={ad}
        />
      </React.Fragment>
    ) : null}
  </div>
);

export default R.compose(
  translate('categories'),
  withStyles(styles),
)(BreadCrumbs);
