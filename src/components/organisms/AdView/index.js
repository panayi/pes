/* @flow */
import React from 'react';
import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { withProps } from 'recompose';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import AdTitle from 'components/atoms/AdTitle';
import EditAdLink from 'components/atoms/EditAdLink';
import ImageSlider from 'components/molecules/ImageSlider';
import { selectors as imagesSelectors } from 'store/images';

type Props = {
  ad: Ad,
  images: Array<Object>,
  classes: Object,
};

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    borderRadius: theme.custom.borderRadius.xl,
    backgroundColor: theme.palette.common.white,
  },
  sliderWrap: {
    width: 500,
  },
  slider: {
    borderRadius: theme.custom.borderRadius.xl,
  },
  content: {
    flex: 1,
    minHeight: 556,
  },
});

const AdView = ({ ad, images, classes }: Props) => (
  <Grid container className={classes.root}>
    <Grid className={classes.sliderWrap}>
      <ImageSlider className={classes.slider} images={images} />
    </Grid>
    <Grid className={classes.content}>
      <AdTitle ad={ad} />
      <EditAdLink ad={ad} />
    </Grid>
  </Grid>
);

AdView.defaultProps = {
  ad: {},
};

export default R.compose(
  withProps(
    createStructuredSelector({
      images: imagesSelectors.adImagesSelector,
    }),
  ),
  withStyles(styles),
)(AdView);
