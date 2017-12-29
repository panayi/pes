/* @flow */
import React from 'react';
import * as R from 'ramda';
import { isNotPlainObj } from 'ramda-adjunct';
import { withProps, defaultProps, branch } from 'recompose';
import { createStructuredSelector } from 'reselect';
import {
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  withStyles,
} from 'material-ui';
import { Link } from 'react-router-dom';
import { connectData } from 'lib/connectData';
import { models } from 'store/data';
import id from 'utils/id';
import AdTitle from 'components/atoms/AdTitle';
import AdPrice from 'components/atoms/AdPrice';
import AdAddress from 'components/atoms/AdAddress';
import AdDate from 'components/atoms/AdDate';
import { selectors as imagesSelectors } from 'store/images';

type Props = {
  ad: Ad,
  width: Number,
  thumbnail: Object,
  classes: Object,
};

const HEADER_HEIGHT = 60;
const CONTENT_HEIGHT = 40;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  ad: {
    textDecoration: 'none',
  },
  adPaperRoot: {
    borderRadius: theme.custom.borderRadius.xl,
  },
  media: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    borderRadius: `${theme.custom.borderRadius.xl}px ${
      theme.custom.borderRadius.xl
    }px 0 0`,
  },
  price: {
    padding: theme.spacing.unit,
  },
  header: {
    padding: theme.spacing.unit,
    height: HEADER_HEIGHT,
    boxSizing: 'border-box',
    overflow: 'hidden',
    textAlign: 'center',
  },
  content: {
    padding: 0,
    height: CONTENT_HEIGHT,
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  headerTitle: {
    fontSize: theme.typography.subheading.fontSize,
  },
});

const AdCard = ({ ad, width, thumbnail, classes }: Props) => {
  const totalHeight = thumbnail.height + HEADER_HEIGHT + CONTENT_HEIGHT;

  return (
    <div
      className={classes.root}
      style={{ width: `${width}px`, height: `${totalHeight}px` }}
    >
      <Card
        className={classes.ad}
        classes={{
          root: classes.adPaperRoot,
        }}
        style={{ width }}
        elevation={1}
        component={Link}
        to={`/i/${id(ad)}`}
      >
        <CardMedia
          className={classes.media}
          image={thumbnail.url}
          style={{ height: `${thumbnail.height}px` }}
        >
          <AdPrice
            className={classes.price}
            color="accent"
            type="title"
            ad={ad}
          />
        </CardMedia>
        <CardHeader
          className={classes.header}
          classes={{
            title: classes.headerTitle,
          }}
          title={<AdTitle type="subheading" ad={ad} />}
        />
        <CardContent className={classes.content}>
          <AdAddress ad={ad} type="caption" align="center" />
          <AdDate ad={ad} type="caption" align="center" />
        </CardContent>
      </Card>
    </div>
  );
};

export default R.compose(
  branch(
    R.propSatisfies(isNotPlainObj, 'ad'),
    connectData({
      ad: models.ads.one((state, props) => props.ad),
    }),
  ),
  defaultProps({
    ad: {},
  }),
  withProps(
    createStructuredSelector({
      thumbnail: imagesSelectors.adFirstImageWithDefaultSelector,
    }),
  ),
  withStyles(styles),
)(AdCard);
