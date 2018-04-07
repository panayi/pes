/* @flow */
import React from 'react';
import * as R from 'ramda';
import { withStateHandlers } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { DesktopScreen, TabletScreen } from 'react-responsive-redux';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import PlaceIcon from 'material-ui-icons/Place';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { selectors as authSelectors } from 'store/firebase/auth';
import { withUserProfileData } from 'hocs/withProfileData';
import AdTitle from 'components/AdTitle/AdTitle';
import AdPrice from 'components/AdPrice/AdPrice';
import AdBody from 'components/AdBody/AdBody';
import AdAddress from 'components/AdAddress/AdAddress';
import SendMessage from 'modules/Messenger/SendMessage/SendMessage';
import ImageSlider from '../ImageSlider/ImageSlider';
import StaticMap from '../StaticMap/StaticMap';
import EditAdLink from '../EditAdLink/EditAdLink';
import Action from '../Action/Action';
import SoldRibbon from '../SoldRibbon/SoldRibbon';
import MarkAsSold from '../MarkAsSold/MarkAsSold';
import FavoriteAd from '../FavoriteAd/FavoriteAd';
import BrowseAds from './BrowseAds/BrowseAds';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs';
import SellerBox from './SellerBox/SellerBox';
import SentMessages from './SentMessages/SentMessages';
import AdDateChip from './AdDateChip/AdDateChip';
import ShareButtons from './ShareButtons/ShareButtons';
import BrowseButton from './BrowseButton/BrowseButton';

type Props = {
  ad: Ad,
  adId: string,
  uid: string,
  sellerName: string,
  sentMessages: Array<string>,
  addMessage: Function,
  classes: Object,
};

const SLIDER_WIDTH_DESKTOP = 500;
const SLIDER_WIDTH_TABLET = 440;
const BASE_HEIGHT = 592;

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 5,
    padding: [
      theme.spacing.unit,
      theme.spacing.unit * 2,
      theme.spacing.unit * 2,
      theme.spacing.unit * 2,
    ],
    [theme.breakpoints.down(theme.map.tablet)]: {
      marginBottom: theme.spacing.unit * 6,
    },
  },
  breadcrumb: {
    marginBottom: theme.spacing.unit * 1.5,
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
  shareButtons: {
    display: 'flex',
    flexDirection: 'column',
  },
  inner: {
    display: 'flex',
    width: '100%',
    height: '75vh',
    minHeight: BASE_HEIGHT,
    position: 'relative',
    overflow: 'hidden',
  },
  images: {
    position: 'relative',
    width: SLIDER_WIDTH_DESKTOP,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down(theme.map.tablet)]: {
      width: SLIDER_WIDTH_TABLET,
    },
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
    position: 'relative',
    width: '100%',
    minHeight: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 3,
    borderBottom: ['1px', 'solid', theme.palette.divider],
  },
  title: {
    marginRight: 48,
    wordBreak: 'break-word',
  },
  headerAction: {
    position: 'absolute',
    top: -11,
    right: 0,
  },
  favoriteButton: {
    color: theme.palette.primary.main,
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
    color: theme.palette.text.secondary,
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
    width: SLIDER_WIDTH_DESKTOP - theme.spacing.unit * 4,
    [theme.breakpoints.down(theme.map.tablet)]: {
      width: SLIDER_WIDTH_TABLET - theme.spacing.unit * 4,
    },
  },
  sellerBox: {
    marginBottom: theme.spacing.unit * 2,
  },
  interactionBox: {
    marginBottom: theme.spacing.unit * 2,
    [theme.breakpoints.down(theme.map.tablet)]: {
      marginTop: -theme.spacing.unit,
    },
  },
});

const DesktopViewAd = ({
  ad,
  adId,
  uid,
  sentMessages,
  addMessage,
  sellerName,
  classes,
}: Props) => (
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
          <AdPrice ad={ad}>
            {({ price }) =>
              price ? (
                <Typography className={classes.price} variant="title">
                  {price}
                </Typography>
              ) : null
            }
          </AdPrice>
          <AdBody ad={ad} className={classes.description} />
          <div className={classes.date}>
            <AdDateChip ad={ad} />
          </div>
          <AdAddress ad={ad}>
            {({ address }) =>
              address ? (
                <div className={classes.location}>
                  <PlaceIcon className={classes.locationIcon} />
                  <Typography
                    className={classes.address}
                    color="textSecondary"
                    component="div"
                  >
                    {address}
                  </Typography>
                </div>
              ) : null
            }
          </AdAddress>
          <div className={classes.mapWrap}>
            <StaticMap
              id={adId}
              className={classes.map}
              center={R.path(['location', 'geoposition'], ad)}
              width={400}
              height={190}
            />
          </div>
          <TabletScreen>
            <ShareButtons />
          </TabletScreen>
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
      <DesktopScreen>
        <div className={classes.offset}>
          <div className={classes.shareButtons}>
            <ShareButtons ad={ad} />
          </div>
        </div>
      </DesktopScreen>
      <BrowseAds adId={adId}>
        {({ previousAd, nextAd }) => (
          <React.Fragment>
            <BrowseButton ad={previousAd} direction="previous" />
            <BrowseButton ad={nextAd} direction="next" />
          </React.Fragment>
        )}
      </BrowseAds>
    </Paper>
  </div>
);

DesktopViewAd.defaultProps = {
  ad: {},
};

const mapStateToProps = createStructuredSelector({
  uid: authSelectors.uidSelector,
});

export default R.compose(
  connect(mapStateToProps),
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
