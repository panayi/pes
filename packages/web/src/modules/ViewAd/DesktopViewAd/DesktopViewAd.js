/* @flow */
import React from 'react';
import * as R from 'ramda';
import { withStateHandlers } from 'recompose';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import PlaceIcon from 'material-ui-icons/Place';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { selectors as authSelectors } from 'store/firebase/auth';
import { withUserProfileData } from 'hocs/withProfileData';
import LinkToViewAd from 'components/LinkToViewAd/LinkToViewAd';
import FacebookShareButton from 'components/FacebookShareButton/FacebookShareButton';
import AdTitle from 'components/AdTitle/AdTitle';
import AdPrice from 'components/AdPrice/AdPrice';
import AdBody from 'components/AdBody/AdBody';
import AdAddress from 'components/AdAddress/AdAddress';
import AdDateChip from 'components/AdDateChip/AdDateChip';
import SendMessage from 'modules/Messenger/SendMessage/SendMessage';
import ImageSlider from '../ImageSlider/ImageSlider';
import StaticMap from '../StaticMap/StaticMap';
import EditAdLink from '../EditAdLink/EditAdLink';
import Action from '../Action/Action';
import SoldRibbon from '../SoldRibbon/SoldRibbon';
import MarkAsSold from '../MarkAsSold/MarkAsSold';
import FavoriteAd from '../FavoriteAd/FavoriteAd';
import TwitterShareAdButton from '../TwitterShareAdButton/TwitterShareAdButton';
import EmailShareAdButton from '../EmailShareAdButton/EmailShareAdButton';
import BrowseAds from './BrowseAds/BrowseAds';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs';
import SellerBox from './SellerBox/SellerBox';
import SentMessages from './SentMessages/SentMessages';

type Props = {
  ad: Ad,
  adId: string,
  location: Object,
  uid: string,
  sellerName: string,
  sentMessages: Array<string>,
  addMessage: Function,
  classes: Object,
};

const SLIDER_WIDTH = 500;
const BASE_HEIGHT = 592;

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit,
  },
  breadcrumb: {
    marginBottom: theme.spacing.unit,
  },
  ad: {
    position: 'relative',
    padding: theme.spacing.unit * 2,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.palette.common.white,
  },
  offset: {
    position: 'absolute',
    bottom: 0,
    right: -64,
    zIndex: 1,
    width: 64,
    boxSizing: 'border-box',
    padding: [theme.spacing.unit * 2, theme.spacing.unit],
  },
  inner: {
    display: 'flex',
    width: '100%',
    height: '72vh',
    minHeight: BASE_HEIGHT,
    position: 'relative',
    overflow: 'hidden',
  },
  images: {
    position: 'relative',
    width: SLIDER_WIDTH,
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: BASE_HEIGHT,
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
  headerAction: {
    marginTop: -12,
  },
  favoriteButton: {
    color: theme.palette.primary.main,
  },
  title: {
    flex: 1,
    wordBreak: 'break-word',
  },
  price: {
    marginBottom: theme.spacing.unit * 2,
  },
  description: {
    flex: 1,
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
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
  },
  seller: {
    position: 'absolute',
    bottom: 0,
    left: theme.spacing.unit * 2,
    width: SLIDER_WIDTH - theme.spacing.unit * 4,
  },
  sellerBox: {
    marginBottom: theme.spacing.unit * 2,
  },
  interactionBox: {
    marginBottom: theme.spacing.unit * 2,
  },
  shareButtons: {
    display: 'flex',
    flexDirection: 'column',
  },
  previousLinkWrap: {
    position: 'absolute',
    left: -56,
    top: BASE_HEIGHT / 2,
    bottom: 0,
  },
  nextLinkWrap: {
    position: 'absolute',
    right: -56,
    top: BASE_HEIGHT / 2,
    bottom: 0,
  },
  previousLink: {
    boxShadow: 'none',
    borderRadius: '50% 0 0 50%',
  },
  nextLink: {
    boxShadow: 'none',
    borderRadius: '0 50% 50% 0',
  },
});

const DesktopViewAd = ({
  ad,
  adId,
  location,
  uid,
  sentMessages,
  addMessage,
  sellerName,
  classes,
}: Props) => {
  const path = location.pathname;

  return (
    <div className={classes.root}>
      <div className={classes.breadcrumb}>
        <Breadcrumbs ad={ad} />
      </div>
      <Paper className={classes.ad}>
        <div className={classes.inner}>
          <div className={classes.images}>
            <SoldRibbon sold={ad.sold} />
            <ImageSlider
              className={classes.slider}
              images={R.values(ad.images)}
              imgixParams={{ w: 900, auto: 'compress,format' }}
              flex
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
              <div className={classes.headerAction}>
                <EditAdLink adId={adId} ad={ad} />
                <FavoriteAd
                  className={classes.favoriteButton}
                  ad={ad}
                  adId={adId}
                  uid={uid}
                />
              </div>
            </div>
            <AdPrice ad={ad} className={classes.price} variant="title" />
            <AdBody ad={ad} className={classes.description} />
            <div className={classes.date}>
              <AdDateChip ad={ad} />
            </div>
            <Typography
              className={classes.location}
              color="textSecondary"
              component="div"
            >
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
              <SentMessages messages={sentMessages} adId={adId} uid={uid} />
              <SellerBox className={classes.sellerBox} ad={ad} />
              {ad.user && (
                <div className={classes.interactionBox}>
                  <Action
                    ad={ad}
                    currentUserId={uid}
                    seller={<MarkAsSold adId={adId} variant="raised" />}
                    buyer={
                      <SendMessage
                        variant="float"
                        placeholder={`Ask ${sellerName} a question`}
                        adId={adId}
                        onSuccess={addMessage}
                      />
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={classes.offset}>
          <div className={classes.shareButtons}>
            <FacebookShareButton path={path} />
            <TwitterShareAdButton path={path} ad={ad} />
            <EmailShareAdButton path={path} ad={ad} />
          </div>
        </div>
        <BrowseAds adId={adId}>
          {({ previousAd, nextAd }) => (
            <React.Fragment>
              <div className={classes.previousLinkWrap}>
                <LinkToViewAd
                  ad={previousAd}
                  className={classes.previousLink}
                  disabled={R.isNil(previousAd)}
                  variant="fab"
                >
                  <KeyboardArrowLeft />
                </LinkToViewAd>
              </div>
              <div className={classes.nextLinkWrap}>
                <LinkToViewAd
                  ad={nextAd}
                  className={classes.nextLink}
                  disabled={R.isNil(nextAd)}
                  variant="fab"
                >
                  <KeyboardArrowRight />
                </LinkToViewAd>
              </div>
            </React.Fragment>
          )}
        </BrowseAds>
      </Paper>
    </div>
  );
};

DesktopViewAd.defaultProps = {
  ad: {},
};

const mapStateToProps = createStructuredSelector({
  uid: authSelectors.uidSelector,
});

export default R.compose(
  connect(mapStateToProps),
  withRouter,
  withUserProfileData(
    {
      sellerName: ['displayName'],
    },
    propSelector(['ad', 'user']),
  ),
  withStateHandlers(
    {
      sentMessages: [],
    },
    {
      addMessage: ({ sentMessages }) => ({ body }) => ({
        sentMessages: R.append(body, sentMessages),
      }),
    },
  ),
  withStyles(styles),
)(DesktopViewAd);
