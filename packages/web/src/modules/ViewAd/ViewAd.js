/* @flow */
import React from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { red } from 'material-ui/colors';
import PlaceIcon from 'material-ui-icons/Place';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import urlForPath from 'utils/urlForPath';
import { selectors as authSelectors } from 'store/firebase/auth';
import { actions as dataActions } from 'store/firebase/data';
import LinkToViewAd from 'components/LinkToViewAd/LinkToViewAd';
import AdTitle from 'components/AdTitle/AdTitle';
import AdPrice from 'components/AdPrice/AdPrice';
import AdBody from 'components/AdBody/AdBody';
import AdAddress from 'components/AdAddress/AdAddress';
import AdDateChip from 'components/AdDateChip/AdDateChip';
import SendMessage from 'components/SendMessage/SendMessage';
import FacebookShareButton from 'components/FacebookShareButton/FacebookShareButton';
import TwitterShareButton from './TwitterShareButton/TwitterShareButton';
import EmailShareButton from './EmailShareButton/EmailShareButton';
import ImageSlider from './ImageSlider/ImageSlider';
import StaticMap from './StaticMap/StaticMap';
import EditAdLink from './EditAdLink/EditAdLink';
import BrowseAds from './BrowseAds/BrowseAds';
import SellerBox from './SellerBox/SellerBox';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs';

type Props = {
  ad: Ad,
  adId: string,
  location: Object,
  uid: string,
  markAdAsSold: Function,
  classes: Object,
};

const SLIDER_WIDTH = 500;
const BASE_HEIGHT = 592;

const styles = theme => ({
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
    right: -60,
    width: 60,
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
    borderRadius: [theme.borderRadius.xl, 0, 0, theme.borderRadius.xl],
    backgroundColor: theme.palette.grey[900],
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
  },
  seller: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    left: theme.spacing.unit * 2,
    width: SLIDER_WIDTH - theme.spacing.unit * 4,
  },
  interactionBox: {
    marginTop: theme.spacing.unit * 2,
  },
  shareButtons: {
    display: 'flex',
    flexDirection: 'column',
    '& > div + div': {
      marginTop: theme.spacing.unit,
    },
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
  ribbon: {
    width: 200,
    background: red.A400,
    position: 'absolute',
    top: 25,
    left: -50,
    zIndex: 1,
    textAlign: 'center',
    lineHeight: '50px',
    letterSpacing: 1,
    color: theme.palette.getContrastText(red.A200),
    transform: 'rotate(-45deg)',
  },
});

const ViewAd = ({ ad, adId, location, uid, markAdAsSold, classes }: Props) => {
  const currentUrl = urlForPath(location.pathname);

  return (
    <div>
      <div className={classes.breadcrumb}>
        <Breadcrumbs ad={ad} />
      </div>
      <div className={classes.ad}>
        <div className={classes.inner}>
          <div className={classes.images}>
            {ad.sold && (
              <Typography className={classes.ribbon}>Sold</Typography>
            )}
            <ImageSlider
              className={classes.slider}
              images={R.values(ad.images)}
              imgixParams={{ w: 900, auto: 'compress,format' }}
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
              <EditAdLink adId={adId} ad={ad} />
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
              <SellerBox ad={ad} />
              {ad.user &&
                !ad.sold && (
                  <div className={classes.interactionBox}>
                    {ad.user !== uid ? (
                      <SendMessage
                        placeholder="Ask a question"
                        adId={adId}
                        buyerId={uid}
                      />
                    ) : (
                      <Button
                        variant="raised"
                        color="primary"
                        fullWidth
                        onClick={() => markAdAsSold()}
                      >
                        Mark as sold
                      </Button>
                    )}
                  </div>
                )}
            </div>
          </div>
        </div>
        <div className={classes.offset}>
          <div className={classes.shareButtons}>
            <FacebookShareButton url={currentUrl} />
            <TwitterShareButton url={currentUrl} />
            <EmailShareButton
              url={currentUrl}
              subject="Check this out!"
              body={currentUrl}
            />
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
      </div>
    </div>
  );
};

ViewAd.defaultProps = {
  ad: {},
};

const mapStateToProps = createStructuredSelector({
  uid: authSelectors.uidSelector,
});

const mapDispatchToProps = (dispatch, { adId }) =>
  bindActionCreators(
    {
      markAdAsSold: () => dataActions.markAdAsSold(adId),
    },
    dispatch,
  );

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withStyles(styles),
)(ViewAd);