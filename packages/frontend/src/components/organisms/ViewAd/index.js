/* @flow */
import React from 'react';
import * as R from 'ramda';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import PlaceIcon from 'material-ui-icons/Place';
import AdTitle from 'components/atoms/AdTitle';
import AdPrice from 'components/atoms/AdPrice';
import AdBody from 'components/atoms/AdBody';
import AdAddress from 'components/atoms/AdAddress';
import EditAdLink from 'components/atoms/EditAdLink';
import AdDateChip from 'components/atoms/AdDateChip';
import StaticMap from 'components/atoms/StaticMap';
import ImageSlider from 'components/molecules/ImageSlider';
import SendMessage from 'components/molecules/SendMessage';

type Props = {
  ad: Ad,
  adId: string,
  classes: Object,
};

const SLIDER_WIDTH = 500;

const styles = theme => ({
  root: {
    display: 'flex',
    width: '100%',
    padding: theme.spacing.unit * 2,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.palette.common.white,
  },
  images: {
    width: SLIDER_WIDTH,
  },
  content: {
    flex: 1,
    minHeight: 556,
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 4,
  },
  slider: {
    borderRadius: [theme.borderRadius.xl, 0, 0, theme.borderRadius.xl],
  },
  header: {
    display: 'flex',
    marginBottom: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 3,
    borderBottom: ['1px', 'solid', theme.palette.divider],
  },
  title: {
    flex: 1,
    wordBreak: 'break-word',
  },
  description: {
    padding: [theme.spacing.unit * 2, 0],
    wordBreak: 'break-word',
  },
  date: {
    marginBottom: theme.spacing.unit * 2,
  },
  location: {
    display: 'flex',
  },
  locationIcon: {
    width: 19,
    height: 19,
    marginRight: 2,
  },
  mapWrap: {
    width: '100%',
    margin: [theme.spacing.unit * 2, 0],
  },
  map: {
    maxWidth: '100%',
  },
});

const ViewAd = ({ ad, adId, classes }: Props) => (
  <div className={classes.root}>
    <div className={classes.images}>
      <ImageSlider
        className={classes.slider}
        images={R.values(ad.images)}
        imgixParams={{ w: SLIDER_WIDTH }}
      />
    </div>
    <div className={classes.content}>
      <div className={classes.header}>
        <AdTitle className={classes.title} ad={ad} type="display1" />
        <EditAdLink ad={ad} adId={adId} color="primary">
          <ModeEditIcon />
        </EditAdLink>
      </div>
      <AdPrice ad={ad} type="title" />
      <AdBody ad={ad} className={classes.description} />
      <div className={classes.date}>
        <AdDateChip ad={ad} />
      </div>
      <Typography className={classes.location} color="textSecondary">
        <PlaceIcon className={classes.locationIcon} />
        <AdAddress ad={ad} className={classes.address} />
      </Typography>
      {/* TODO: Use a real map */}
      <div className={classes.mapWrap}>
        <StaticMap
          id={adId}
          className={classes.map}
          center={R.path(['location', 'geoposition'], ad)}
          width={400}
          height={190}
        />
      </div>
      <SendMessage adId={adId} />
    </div>
  </div>
);

ViewAd.defaultProps = {
  ad: {},
};

export default R.compose(withStyles(styles))(ViewAd);
