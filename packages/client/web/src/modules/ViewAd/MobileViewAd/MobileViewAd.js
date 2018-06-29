import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { withProps, withStateHandlers } from 'recompose';
import { createStructuredSelector } from 'reselect';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import PlaceIcon from '@material-ui/icons/Place';
import TimeIcon from '@material-ui/icons/AccessTime';
import CloseIcon from '@material-ui/icons/Close';
import MessageIcon from '@material-ui/icons/Message';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ShareIcon from 'mdi-react/ShareIcon';
import * as sellerTypes from '@pesposa/core/src/config/sellerTypes';
import { actions as modalActions } from '@pesposa/client-core/src/store/modals';
import { selectors as authSelectors } from '@pesposa/client-core/src/store/firebase/auth';
import requireUserToCallAction from '@pesposa/client-core/src/hocs/requireUserToCallAction';
import connectSearch from '@pesposa/client-core/src/hocs/connectSearch';
import ReduxModal from '@pesposa/client-core/src/components/Modal/ReduxModal/ReduxModal';
import Link from '@pesposa/client-core/src/components/Link/Link';
import Button from '@pesposa/client-core/src/components/Button/Button';
import SellerImage from '@pesposa/client-core/src/modules/Ad/SellerImage/SellerImage';
import LinkToSeller from '@pesposa/client-core/src/modules/Ad/LinkToSeller/LinkToSeller';
import FavoriteAd from '@pesposa/client-core/src/modules/Ad/FavoriteAd/FavoriteAd';
import AdTitle from '@pesposa/client-core/src/modules/Ad/AdTitle/AdTitle';
import AdPrice from '@pesposa/client-core/src/modules/Ad/AdPrice/AdPrice';
import AdPlace from '@pesposa/client-core/src/modules/Ad/AdPlace/AdPlace';
import AdDate from '@pesposa/client-core/src/modules/Ad/AdDate/AdDate';
import SellerName from '@pesposa/client-core/src/modules/Ad/SellerName/SellerName';
import AdBody from '@pesposa/client-core/src/modules/Ad/AdBody/AdBody';
import Conversation from 'modules/Messenger/Conversation/Conversation';
import ImageSlider from '../ImageSlider/ImageSlider';
import EditAdButton from '../EditAdButton/EditAdButton';
import ToggleSold from '../ToggleSold/ToggleSold';
import RevealPhoneButton from '../RevealPhoneButton/RevealPhoneButton';
import VerifiedWith from '../VerifiedWith/VerifiedWith';
import SoldRibbon from '../SoldRibbon/SoldRibbon';
import RelatedAds from '../RelatedAds/RelatedAds';
import Action from '../Action/Action';
import BackToListButton from '../BackToListButton/BackToListButton';
import ShareAd from './ShareAd/ShareAd';
import Map from '../Map/Map';

const gutters = (theme, styles = {}) => ({
  paddingLeft: theme.spacing.unit * 2,
  paddingRight: theme.spacing.unit * 2,
  ...styles,
});

const styles = theme => ({
  root: {
    background: theme.palette.background.default,
  },
  header: gutters(theme, {
    position: 'fixed',
    top: 0,
    zIndex: 3,
    width: '100%',
    outline: 0,
    borderBottom: [1, 'solid', theme.palette.divider],
    background: fade(theme.palette.common.white, 0.85),
  }),
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    marginRight: -16,
    marginLeft: -16,
  },
  actionIconButton: {
    '& svg': {
      width: 30,
      height: 30,
    },
  },
  flex: {
    flex: 1,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    paddingTop: 48,
    paddingBottom: 74,
  },
  images: {
    height: '100vw',
    position: 'relative',
    zIndex: 1,
  },
  details: {
    paddingTop: theme.spacing.unit,
    position: 'relative',
    background: theme.palette.common.white,
  },
  withDots: {
    paddingTop: theme.spacing.unit * 3,
  },
  avatarWrap: {
    position: 'absolute',
    right: theme.spacing.unit * 2,
    top: 'calc(100vw - 12px)',
    zIndex: 2,
    padding: 2,
    borderRadius: '50%',
  },
  titleBox: gutters(theme, {
    paddingTop: theme.spacing.unit * 2,
    borderBottom: [1, 'solid', theme.palette.divider],
  }),
  mainDetails: {
    display: 'flex',
    paddingBottom: theme.spacing.unit * 3,
  },
  moreInfo: {
    textAlign: 'center',
  },
  moreInfoButton: {
    textTransform: 'uppercase',
  },
  title: {
    flex: 1,
    lineHeight: '1.20588em',
    wordBreak: 'break-word',
    fontWeight: theme.typography.fontWeightRegular,
  },
  price: {
    marginLeft: theme.spacing.unit * 3,
  },
  description: gutters(theme, {
    padding: [theme.spacing.unit * 2, 0],
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',
  }),
  placeBox: gutters(theme, {
    borderTop: [1, 'solid', theme.palette.divider],
  }),
  info: {
    display: 'flex',
    justifyContent: 'space-around',
    paddingTop: theme.spacing.unit,
    color: theme.palette.text.secondary,
  },
  location: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing.unit,
  },
  posted: {
    display: 'flex',
  },
  date: {
    display: 'flex',
  },
  locationIcon: {
    width: 19,
    height: 19,
    marginRight: 3,
    marginLeft: -2,
  },
  address: {
    color: theme.palette.text.secondary,
  },
  staticMap: {
    display: 'flex',
  },
  sellerBox: gutters(theme, {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  }),
  verifiedWith: {
    flex: 1,
    paddingLeft: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
  },
  profileButton: {
    height: 40,
  },
  actions: gutters(theme, {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    display: 'flex',
    padding: [theme.spacing.unit * 2, 0],
    background: theme.palette.common.white,
    borderTop: [1, 'solid', theme.palette.divider],
  }),
  actionButtons: {
    flex: 1,
    display: 'flex',
  },
  actionButton: {
    textTransform: 'uppercase',
    '&:first-child': {
      marginRight: theme.spacing.unit,
    },
    '&:last-child': {
      marginLeft: theme.spacing.unit,
    },
  },
  slideshow: {
    height: '100vh',
    width: '100vw',
    backgroundColor: theme.palette.common.black,
    '& $header': {
      justifyContent: 'flex-end',
    },
  },
  slideshowHeader: {
    paddingTop: theme.spacing.unit * 3,
    border: 0,
    background: 'none',
  },
  relatedAds: gutters(theme, {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    borderTop: [1, 'solid', theme.palette.divider],
  }),
});

class MobileViewAd extends React.Component {
  static defaultProps = {
    ad: {},
  };

  renderAd() {
    const {
      ad,
      adId,
      imagesList,
      uid,
      viewSlideShow,
      viewConversation,
      setCurrentSlide,
      openModal,
      classes,
    } = this.props;
    const dots = imagesList.length > 1;

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.headerActions}>
            <BackToListButton
              component={Link.icon}
              className={classes.actionIconButton}
              color="inherit"
            >
              <KeyboardArrowLeft />
            </BackToListButton>
            <div className={classes.flex} />
            <IconButton
              className={classes.actionIconButton}
              color="inherit"
              onClick={() => openModal('shareAd', { ad })}
            >
              <ShareIcon />
            </IconButton>
            <FavoriteAd
              className={classes.actionIconButton}
              ad={ad}
              adId={adId}
            />
          </div>
        </div>
        <div className={classes.content}>
          <div
            className={classes.images}
            onClick={viewSlideShow}
            role="button"
            tabIndex="-1"
          >
            <SoldRibbon sold={ad.sold} />
            <ImageSlider
              images={imagesList}
              imgixParams={{ w: 900, fit: 'clip', auto: 'compress,format' }}
              afterChange={setCurrentSlide}
              swipeToSlide
              arrows={false}
              dots={dots}
              cover
            />
          </div>
          <Paper className={classes.avatarWrap} elevation={0}>
            <SellerImage ad={ad} />
          </Paper>
          <div
            className={classNames(classes.details, {
              [classes.withDots]: dots,
            })}
          >
            <div className={classes.titleBox}>
              <div className={classes.mainDetails}>
                <AdTitle
                  className={classes.title}
                  ad={ad}
                  variant="title"
                  component="h1"
                />
                <AdPrice ad={ad}>
                  {({ price }) =>
                    price ? (
                      <Typography className={classes.price} variant="title">
                        {price}
                      </Typography>
                    ) : null
                  }
                </AdPrice>
              </div>
            </div>
            <AdBody ad={ad} className={classes.description} />
            <div className={classes.placeBox}>
              <div className={classes.info}>
                <div className={classes.location}>
                  <PlaceIcon className={classes.locationIcon} />
                  <AdPlace ad={ad}>
                    {({ place }) =>
                      place ? (
                        <Typography color="inherit">{place}</Typography>
                      ) : null
                    }
                  </AdPlace>
                </div>
                <div className={classes.posted}>
                  <div className={classes.date}>
                    <TimeIcon className={classes.locationIcon} />
                    <AdDate ad={ad}>
                      {({ date }) => (
                        <Typography color="inherit">{date}</Typography>
                      )}
                    </AdDate>
                  </div>
                </div>
              </div>
            </div>
            <Map
              ad={ad}
              adId={adId}
              staticMapProps={{
                width: 768,
                height: 360,
                className: classes.staticMap,
              }}
            />
            <LinkToSeller sellerId={ad.seller} sellerType={ad.sellerType}>
              {({ navigate }) => (
                <div
                  role="link"
                  tabIndex="-1"
                  className={classes.sellerBox}
                  onClick={navigate}
                >
                  <SellerImage ad={ad} className={classes.avatar} size={40} />
                  <div className={classes.verifiedWith}>
                    <SellerName ad={ad}>
                      {({ name }) => <Typography>{name}</Typography>}
                    </SellerName>
                    {ad.sellerType === sellerTypes.USER && (
                      <VerifiedWith user={ad.seller} />
                    )}
                  </div>
                  <IconButton className={classes.profileButton}>
                    <KeyboardArrowRight />
                  </IconButton>
                </div>
              )}
            </LinkToSeller>
            <RelatedAds
              className={classes.relatedAds}
              ad={ad}
              adId={adId}
              hitsPerPage={4}
              maxHits={4}
            />
          </div>
        </div>
        <div className={classes.actions}>
          <div className={classes.actionButtons}>
            <Action
              ad={ad}
              currentUserId={uid}
              seller={
                <React.Fragment>
                  <ToggleSold
                    ad={ad}
                    className={classes.actionButton}
                    size="small"
                    variant="outlined"
                  />
                  <EditAdButton
                    className={classes.actionButton}
                    adId={adId}
                    ad={ad}
                    size="small"
                    variant="raised"
                    fullWidth
                  >
                    Edit your ad
                  </EditAdButton>
                </React.Fragment>
              }
              buyer={
                <React.Fragment>
                  <RevealPhoneButton
                    ad={ad}
                    className={classes.actionButton}
                    buttonProps={{
                      size: 'small',
                      variant: 'outline',
                      color: 'primary',
                      fullWidth: true,
                    }}
                  >
                    Call
                  </RevealPhoneButton>
                  <Button
                    className={classes.actionButton}
                    size="small"
                    variant="raised"
                    color="primary"
                    fullWidth
                    onClick={viewConversation}
                  >
                    <MessageIcon />&nbsp;&nbsp;Message
                  </Button>
                </React.Fragment>
              }
              noUser={
                <RevealPhoneButton
                  ad={ad}
                  className={classes.actionButton}
                  buttonProps={{
                    size: 'small',
                    variant: 'raised',
                    color: 'primary',
                    fullWidth: true,
                  }}
                >
                  Call
                </RevealPhoneButton>
              }
              sold={
                <Link
                  to={ad ? `/c/${ad.category}` : '/'}
                  className={classes.actionButton}
                  size="small"
                  variant="raised"
                  color="primary"
                  fullWidth
                >
                  Find more like this
                </Link>
              }
            />
          </div>
        </div>
        <ReduxModal id="shareAd" content={ShareAd} />
      </div>
    );
  }

  renderSlideshow() {
    const { imagesList, viewAd, currentSlideIndex, classes } = this.props;

    return (
      <React.Fragment>
        <div className={classNames(classes.header, classes.slideshowHeader)}>
          <Button
            className={classes.actionIconButton}
            variant="raised"
            size="small"
            onClick={viewAd}
          >
            Close
          </Button>
        </div>
        <ImageSlider
          className={classes.slideshow}
          images={imagesList}
          imgixParams={{ w: 900, fit: 'clip', auto: 'compress,format' }}
          swipeToSlide
          initialSlide={currentSlideIndex}
          arrows
          dots
          flex
        />
      </React.Fragment>
    );
  }

  renderConversation() {
    const { uid, adId, ad, viewAd } = this.props;

    return (
      <SellerName ad={ad}>
        {({ name }) => (
          <Conversation
            buyerId={uid}
            adId={adId}
            variant="box"
            inputPlaceholder={`Ask ${name || 'seller'} a question`}
            sendMessageAction={
              <IconButton onClick={viewAd}>
                <CloseIcon />
              </IconButton>
            }
          />
        )}
      </SellerName>
    );
  }

  render() {
    const { view } = this.props;

    if (view === 'slideshow') {
      return this.renderSlideshow();
    }

    if (view === 'conversation') {
      return this.renderConversation();
    }

    return this.renderAd();
  }
}

const mapStateToProps = createStructuredSelector({
  uid: authSelectors.uidSelector,
});

const mapDispatchToProps = {
  openModal: modalActions.openModal,
};

export default R.compose(
  connectSearch(mapStateToProps, mapDispatchToProps),
  withProps(
    createStructuredSelector({
      imagesList: R.compose(
        R.values,
        R.pathOr({}, ['ad', 'images']),
      ),
    }),
  ),
  withStateHandlers(
    {
      view: 'ad',
      currentSlideIndex: 0,
    },
    {
      viewSlideShow: () => () => ({
        view: 'slideshow',
      }),
      viewConversation: () => () => ({
        view: 'conversation',
        currentSlideIndex: 0,
      }),
      viewAd: () => () => ({
        view: 'ad',
        currentSlideIndex: 0,
      }),
      setCurrentSlide: () => currentSlideIndex => ({
        currentSlideIndex,
      }),
    },
  ),
  requireUserToCallAction('viewConversation'),
  withStyles(styles),
)(MobileViewAd);
