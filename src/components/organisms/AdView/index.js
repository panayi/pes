/* @flow */
import React from 'react';
import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { withProps } from 'recompose';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import PlaceIcon from 'material-ui-icons/Place';
import AdTitle from 'components/atoms/AdTitle';
import AdPrice from 'components/atoms/AdPrice';
import AdBody from 'components/atoms/AdBody';
import AdAddress from 'components/atoms/AdAddress';
import EditAdLink from 'components/atoms/EditAdLink';
import ImageSlider from 'components/molecules/ImageSlider';
import AdDateChip from 'components/molecules/AdDateChip';
import SendMessage from 'components/molecules/SendMessage';
import { selectors as imagesSelectors } from 'store/images';

type Props = {
  ad: Ad,
  adId: string,
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
    borderRadius: `${theme.custom.borderRadius.xl}px 0 0 ${
      theme.custom.borderRadius.xl
    }px`,
  },
  content: {
    flex: 1,
    minHeight: 556,
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 4,
  },
  header: {
    display: 'flex',
    marginBottom: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 3,
    borderBottom: `1px solid ${theme.palette.text.divider}`,
  },
  title: {
    flex: 1,
  },
  description: {
    padding: `${theme.spacing.unit * 2}px 0`,
  },
  location: {
    display: 'flex',
  },
  map: {
    width: '100%',
  },
  mapWrap: {
    width: '100%',
    margin: `${theme.spacing.unit * 2}px 0`,
  },
});

const AdView = ({ ad, adId, images, classes }: Props) => (
  <Grid container className={classes.root}>
    <Grid className={classes.sliderWrap}>
      <ImageSlider className={classes.slider} images={images} />
    </Grid>
    <Grid className={classes.content}>
      <div className={classes.header}>
        <AdTitle className={classes.title} ad={ad} type="display1" />
        <EditAdLink ad={ad} adId={adId} color="primary" dense>
          <ModeEditIcon />
        </EditAdLink>
      </div>
      <AdPrice ad={ad} type="title" />
      <AdBody ad={ad} className={classes.description} />
      <AdDateChip ad={ad} />
      <div className={classes.location}>
        <PlaceIcon />
        <AdAddress ad={ad} className={classes.address} />
      </div>
      {/* TODO: Use a real map */}
      <div className={classes.mapWrap}>
        <img
          className={classes.map}
          src="https://maps.googleapis.com/maps/api/staticmap?center=35.1635784,33.3657375&amp;zoom=15&amp;size=400x145&amp;client=gme-letgocom1&amp;channel=webpwa&amp;signature=6WvNme00-yzaPC4Bw6JPEanc1mI="
          alt=""
        />
      </div>
      <SendMessage adId={adId} />
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
