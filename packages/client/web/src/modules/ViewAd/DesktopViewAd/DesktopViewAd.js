import React from 'react';
import * as R from 'ramda';
import { withStateHandlers, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { DesktopScreen, TabletScreen } from 'react-responsive-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import PlaceIcon from '@material-ui/icons/Place';
import { selectors as authSelectors } from '@pesposa/client-core/src/store/firebase/auth';
import AdTitle from '@pesposa/client-core/src/modules/Ad/AdTitle/AdTitle';
import AdPrice from '@pesposa/client-core/src/modules/Ad/AdPrice/AdPrice';
import AdPlace from '@pesposa/client-core/src/modules/Ad/AdPlace/AdPlace';
import FavoriteAd from '@pesposa/client-core/src/modules/Ad/FavoriteAd/FavoriteAd';
import SellerName from '@pesposa/client-core/src/modules/Ad/SellerName/SellerName';
import DeleteAdButton from '@pesposa/client-core/src/modules/Ad/DeleteAdButton/DeleteAdButton';
import SendMessage from 'modules/Messenger/SendMessage/SendMessage';
import ImageSlider from '../ImageSlider/ImageSlider';
import EditAdButton from '../EditAdButton/EditAdButton';
import Action from '../Action/Action';
import SoldRibbon from '../SoldRibbon/SoldRibbon';
import ToggleSold from '../ToggleSold/ToggleSold';
import RelatedAds from '../RelatedAds/RelatedAds';
import BrowseAds from './BrowseAds/BrowseAds';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs';
import SellerBox from './SellerBox/SellerBox';
import SentMessages from './SentMessages/SentMessages';
import AdDateChip from './AdDateChip/AdDateChip';
import ShareButtons from './ShareButtons/ShareButtons';
import BrowseButton from './BrowseButton/BrowseButton';
import AdBody from './AdBody/AdBody';
import Map from '../Map/Map';

// type Props = {
//   ad: Ad,
//   adId: string,
//   uid: string,
//   sellerName: string,
//   sentMessages: Array<string>,
//   addMessage: Function,
//   classes: Object,
// };

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
    flex: 1,
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 4,
    overflowY: 'auto',
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
    marginRight: 80,
    wordBreak: 'break-word',
  },
  headerAction: {
    display: 'flex',
    position: 'absolute',
    top: -11,
    right: 0,
  },
  favoriteButton: {
    color: theme.palette.primary.main,
    '& svg': {
      width: 32,
      height: 32,
    },
  },
  price: {
    marginBottom: theme.spacing.unit * 2,
  },
  descriptionWrap: {
    paddingTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4,
  },
  description: {
    whiteSpace: 'pre-wrap',
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
  map: {
    margin: [theme.spacing.unit * 2, 0],
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
  relatedAds: {
    width: '100%',
    paddingTop: theme.spacing.unit * 3,
    textAlign: 'center',
  },
});

const DesktopViewAd = ({
  ad,
  adId,
  uid,
  sentMessages,
  addMessage,
  history,
  classes,
}) => (
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
              component="h1"
            />
            <div className={classes.headerAction}>
              <EditAdButton adId={adId} ad={ad} />
              <DeleteAdButton
                adId={adId}
                ad={ad}
                onDeleted={() => history.replace('/')}
              />
              <FavoriteAd
                className={classes.favoriteButton}
                ad={ad}
                adId={adId}
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
          <div className={classes.descriptionWrap}>
            <AdBody className={classes.description} adId={adId} ad={ad} />
          </div>
          <div className={classes.date}>
            <AdDateChip ad={ad} />
          </div>
          <AdPlace ad={ad}>
            {({ place }) =>
              place ? (
                <div className={classes.location}>
                  <PlaceIcon className={classes.locationIcon} />
                  <Typography color="textSecondary" component="div">
                    {place}
                  </Typography>
                </div>
              ) : null
            }
          </AdPlace>
          <Map
            className={classes.map}
            ad={ad}
            adId={adId}
            staticMapProps={{ width: 400, height: 190 }}
          />
          <TabletScreen>
            <ShareButtons />
          </TabletScreen>
          <div className={classes.seller}>
            <SentMessages messages={sentMessages} adId={adId} uid={uid} />
            <SellerBox ad={ad} className={classes.sellerBox} />
            <div className={classes.interactionBox}>
              <Action
                ad={ad}
                currentUserId={uid}
                seller={<ToggleSold ad={ad} variant="raised" />}
                buyer={
                  ad.sold ? null : (
                    <SellerName ad={ad}>
                      {({ name }) => (
                        <SendMessage
                          variant="float"
                          placeholder={`Ask ${name || 'seller'} a question`}
                          adId={adId}
                          onSuccess={addMessage}
                        />
                      )}
                    </SellerName>
                  )
                }
              />
            </div>
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
    <div className={classes.relatedAds}>
      <RelatedAds ad={ad} adId={adId} />
    </div>
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
  withStateHandlers(
    {
      sentMessages: [],
    },
    {
      addMessage: ({ sentMessages }) => ({ body }) => ({
        sentMessages: R.append(body, sentMessages),
      }),
      resetSentMessages: () => () => ({
        sentMessages: [],
      }),
    },
  ),
  lifecycle({
    componentDidUpdate(prevProps) {
      if (this.props.adId !== prevProps.adId) {
        this.props.resetSentMessages();
      }
    },
  }),
  withRouter,
  withStyles(styles),
)(DesktopViewAd);
