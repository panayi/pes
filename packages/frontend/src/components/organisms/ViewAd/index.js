/* @flow */
import React from 'react';
import * as R from 'ramda';
import { withRouter } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import PlaceIcon from 'material-ui-icons/Place';
import urlForPath from 'utils/urlForPath';
import AdTitle from 'components/atoms/AdTitle';
import AdPrice from 'components/atoms/AdPrice';
import AdBody from 'components/atoms/AdBody';
import AdAddress from 'components/atoms/AdAddress';
import EditAdLink from 'components/atoms/EditAdLink';
import AdDateChip from 'components/atoms/AdDateChip';
import StaticMap from 'components/atoms/StaticMap';
import FacebookShareButton from 'components/molecules/FacebookShareButton';
import TwitterShareButton from 'components/molecules/TwitterShareButton';
import EmailShareButton from 'components/molecules/EmailShareButton';
import ImageSlider from 'components/molecules/ImageSlider';
import SendMessage from 'components/molecules/SendMessage';
import SellerBox from './SellerBox';

type Props = {
  ad: Ad,
  adId: string,
  location: Object,
  classes: Object,
};

const SLIDER_WIDTH = 500;

const styles = theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing.unit * 2,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.palette.common.white,
  },
  offset: {
    position: 'absolute',
    bottom: 0,
    right: -60,
    width: 60,
    boxSizing: 'border-box',
    padding: [theme.spacing.unit * 2, theme.spacing.unit],
  },
  inner: {
    display: 'flex',
    width: '100%',
    height: '72vh',
    minHeight: 592,
    position: 'relative',
    overflow: 'hidden',
  },
  images: {
    width: SLIDER_WIDTH,
    display: 'flex',
    alignItems: 'center',
    borderRadius: [theme.borderRadius.xl, 0, 0, theme.borderRadius.xl],
    backgroundColor: theme.palette.grey[900],
  },
  content: {
    flex: 1,
    minHeight: 556,
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 4,
  },
  slider: {
    flex: 1,
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
  price: {
    marginBottom: theme.spacing.unit * 2,
  },
  description: {
    maxHeight: 180,
    paddingTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4,
    wordBreak: 'break-word',
    overflowY: 'auto',
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
  seller: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    left: theme.spacing.unit * 2,
    width: SLIDER_WIDTH - theme.spacing.unit * 4,
  },
  sendMessageWrap: {
    marginTop: theme.spacing.unit * 2,
  },
  shareButtons: {
    display: 'flex',
    flexDirection: 'column',
    '& > div + div': {
      marginTop: theme.spacing.unit,
    },
  },
});

const ViewAd = ({ ad, adId, location, classes }: Props) => {
  const currentUrl = urlForPath(location.pathname);

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.images}>
          <ImageSlider
            className={classes.slider}
            images={R.values(ad.images)}
            imgixParams={{ w: SLIDER_WIDTH }}
          />
        </div>
        <div className={classes.content}>
          <div className={classes.header}>
            <AdTitle
              className={classes.title}
              ad={ad}
              variant="title"
              color="textSecondary"
            />
            <EditAdLink ad={ad} adId={adId} color="primary">
              <ModeEditIcon />
            </EditAdLink>
          </div>
          <AdPrice ad={ad} className={classes.price} variant="title" />
          <AdBody ad={ad} className={classes.description} />
          <div className={classes.date}>
            <AdDateChip ad={ad} />
          </div>
          <Typography className={classes.location} color="textSecondary">
            <PlaceIcon className={classes.locationIcon} />
            <AdAddress ad={ad} className={classes.address} />
          </Typography>
          <div className={classes.mapWrap}>
            <StaticMap
              id={adId}
              className={classes.map}
              center={R.path(['location', 'geoposition'], ad)}
              width={400}
              height={190}
            />
          </div>
          <div className={classes.seller}>
            <SellerBox ad={ad} />
            {ad.user && (
              <div className={classes.sendMessageWrap}>
                <SendMessage adId={adId} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={classes.offset}>
        <div className={classes.shareButtons}>
          <FacebookShareButton url={currentUrl} />
          <TwitterShareButton url={currentUrl} />
          <EmailShareButton subject="Check this out!" body={currentUrl} />
        </div>
      </div>
    </div>
  );
};

ViewAd.defaultProps = {
  ad: {},
};

export default R.compose(withStyles(styles), withRouter)(ViewAd);
