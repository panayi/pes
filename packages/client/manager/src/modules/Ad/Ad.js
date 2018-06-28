import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { withProps } from 'recompose';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { red, green, orange } from '@material-ui/core/colors';
import withStyles from '@material-ui/core/styles/withStyles';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { deserializeAdSelector } from '@pesposa/core/src/selectors/ads';
import A from '@pesposa/client-core/src/components/A/A';
import LinkToAd from '@pesposa/client-core/src/modules/Ad/LinkToAd/LinkToAd';
import hydrateAd from '@pesposa/client-core/src/modules/Ad/hydrateAd';
import AdTitle from '@pesposa/client-core/src/modules/Ad/AdTitle/AdTitle';
import AdBody from '@pesposa/client-core/src/modules/Ad/AdBody/AdBody';
import AdPrice from '@pesposa/client-core/src/modules/Ad/AdPrice/AdPrice';
import AdPlace from '@pesposa/client-core/src/modules/Ad/AdPlace/AdPlace';
import AdDate from '@pesposa/client-core/src/modules/Ad/AdDate/AdDate';
import SellerImage from '@pesposa/client-core/src/modules/Ad/SellerImage/SellerImage';
import SellerName from '@pesposa/client-core/src/modules/Ad/SellerName/SellerName';
import LabelValue from 'components/LabelValue/LabelValue';
import AdImages from './AdImages/AdImages';

const styles = theme => ({
  root: {
    flex: 1,
    padding: theme.spacing.unit * 2,
  },
  container: {
    flexGrow: 1,
  },
  main: {
    borderRight: [1, 'solid', theme.palette.divider],
  },
  images: {
    marginBottom: theme.spacing.unit * 2,
  },
  title: {
    marginBottom: theme.spacing.unit * 2,
  },
  seller: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing.unit * 2,
  },
  sellerName: {
    marginLeft: theme.spacing.unit,
  },
  compare: {
    display: 'flex',
    '&> *': {
      flex: 1,
    },
  },
  before: {
    textDecoration: 'line-through',
    background: red[100],
    '& + $after': {
      background: green[100],
    },
  },
  after: {
    display: 'block',
  },
  status: {
    textTransform: 'capitalize',
  },
  published: {
    color: green[500],
  },
  rejected: {
    color: red[500],
  },
  deleted: {
    color: orange[500],
  },
  link: {
    padding: 0,
  },
});

const AdLink = withProps({
  component: withProps({ component: Link })(A),
})(LinkToAd);

const Ad = ({ ad, adId, beforeAd, classes }) => (
  <div className={classes.root}>
    <Grid className={classes.container} spacing={16} container>
      <Grid className={classes.main} xs={6} sm={7} md={8} lg={9} item>
        <div className={classes.images}>
          <AdImages
            adId={adId}
            images={ad.images}
            beforeImages={beforeAd ? beforeAd.images : null}
          />
        </div>
        <LabelValue
          className={classes.title}
          label="Title"
          value={
            <span className={classes.compare}>
              {beforeAd &&
                !R.equals(beforeAd.title, ad.title) && (
                  <AdTitle
                    component="span"
                    className={classes.before}
                    ad={beforeAd}
                  />
                )}
              <AdTitle className={classes.after} ad={ad} component="span" />
            </span>
          }
        />
        <span className={classes.compare}>
          {beforeAd &&
            !R.equals(beforeAd.body, ad.body) && (
              <AdBody className={classes.before} ad={beforeAd} />
            )}
          <AdBody className={classes.after} ad={ad} />
        </span>
      </Grid>
      <Grid xs={6} sm={5} md={4} lg={3} item>
        <div className={classes.seller}>
          <SellerImage ad={ad} />
          <SellerName ad={ad}>
            {({ name }) => (
              <Typography className={classes.sellerName}>{name}</Typography>
            )}
          </SellerName>
        </div>
        <LabelValue
          label="Category"
          value={
            <span className={classes.compare}>
              {beforeAd &&
                !R.equals(beforeAd.category, ad.category) && (
                  <span className={classes.before}>{beforeAd.category}</span>
                )}
              <span className={classes.after}>{ad.category}</span>
            </span>
          }
        />
        <AdPrice ad={ad}>
          {({ price }) => (
            <LabelValue
              label="Price"
              value={
                <span className={classes.compare}>
                  {beforeAd &&
                    !R.equals(beforeAd.price, ad.price) && (
                      <AdPrice component="span" ad={beforeAd}>
                        {({ price: beforePrice }) => (
                          <span className={classes.before}>{beforePrice}</span>
                        )}
                      </AdPrice>
                    )}
                  <span className={classes.after}>{price}</span>
                </span>
              }
            />
          )}
        </AdPrice>
        <AdPlace ad={ad}>
          {({ place }) => (
            <LabelValue
              label="Location"
              value={
                <span className={classes.compare}>
                  {beforeAd &&
                    !R.equals(beforeAd.location, ad.location) && (
                      <AdPlace component="span" ad={beforeAd}>
                        {({ place: beforePlace }) => (
                          <span className={classes.before}>{beforePlace}</span>
                        )}
                      </AdPlace>
                    )}
                  <span className={classes.after}>{place}</span>
                </span>
              }
            />
          )}
        </AdPlace>
        <AdDate ad={ad}>
          {({ date }) => <LabelValue label="Created" value={date} />}
        </AdDate>
        {ad.status && (
          <LabelValue
            label="Status"
            value={
              <span className={classNames(classes.status, classes[ad.status])}>
                {ad.status}
              </span>
            }
          />
        )}
        <AdLink color="primary" ad={ad} target="_blank">
          View on Pesposa App
        </AdLink>
      </Grid>
    </Grid>
  </div>
);

Ad.defaultProps = {
  ad: {},
};

export default R.compose(
  hydrateAd(propSelector('adId'), propSelector('ad')),
  withProps(({ adId, beforeAd }) => ({
    beforeAd: beforeAd ? deserializeAdSelector({ ad: beforeAd, adId }) : null,
  })),
  withStyles(styles),
)(Ad);
