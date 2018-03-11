import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { withProps, withStateHandlers, branch } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import PlaceIcon from 'material-ui-icons/Place';
import TimeIcon from 'material-ui-icons/AccessTime';
import CloseIcon from 'material-ui-icons/Close';
import MessageIcon from 'material-ui-icons/Message';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import propSelector from '@pesposa/core/src/utils/propSelector';
import hydrateAd from 'hocs/hydrateAd';
import withProfileData from 'hocs/withProfileData';
import { selectors as authSelectors } from 'store/firebase/auth';
import { actions as dataActions } from 'store/firebase/data';
import ShareIcon from 'mdi-react/ShareIcon';
import Conversation from 'modules/Messenger/Conversation/Conversation';
import Link from 'components/Link/Link';
import RoundButton from 'components/RoundButton/RoundButton';
import AdTitle from 'components/AdTitle/AdTitle';
import AdPrice from 'components/AdPrice/AdPrice';
import AdBody from 'components/AdBody/AdBody';
import AdAddress from 'components/AdAddress/AdAddress';
import AdDate from 'components/AdDate/AdDate';
import ProfileImage from 'components/ProfileImage/ProfileImage';
import UserFullName from 'components/UserFullName/UserFullName';
import ImageSlider from '../ImageSlider/ImageSlider';
import StaticMap from '../StaticMap/StaticMap';
import RevealPhoneButton from '../RevealPhoneButton/RevealPhoneButton';
import VerifiedWith from '../VerifiedWith/VerifiedWith';
import FavoriteAd from '../FavoriteAd/FavoriteAd';

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
    paddingTop: theme.spacing.unit,
    color: theme.palette.common.white,
    outline: 0,
  }),
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    marginRight: -16,
    marginLeft: -16,
  },
  actionIconButton: {
    '& svg': {
      fill: 'currentColor',
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
    top: 'calc(100vw - 58px)',
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
    color: theme.palette.text.secondary,
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
  map: {
    display: 'flex',
    maxWidth: '100%',
    height: 'auto',
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
    background: 'rgba(255, 255, 255, 0.85)',
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
  callButton: {
    background: theme.palette.common.white,
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
  },
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
      markAdAsSold,
      viewSlideShow,
      viewConversation,
      setCurrentSlide,
      classes,
    } = this.props;
    const dots = imagesList.length > 1;

    return (
      <div className={classes.root}>
        <div className={classes.header} role="button" tabIndex="-1">
          <div className={classes.headerActions}>
            <Link.icon
              to="/"
              className={classes.actionIconButton}
              color="inherit"
            >
              <KeyboardArrowLeft />
            </Link.icon>
            <div className={classes.flex} />
            <IconButton className={classes.actionIconButton} color="inherit">
              <ShareIcon />
            </IconButton>
            <FavoriteAd className={classes.actionIconButton} adId={ad.id} />
          </div>
        </div>
        <div className={classes.content}>
          <div
            className={classes.images}
            onClick={viewSlideShow}
            role="button"
            tabIndex="-1"
          >
            <ImageSlider
              className={classes.imageSlider}
              images={imagesList}
              imgixParams={{ w: 900, auto: 'compress,format' }}
              afterChange={setCurrentSlide}
              swipeToSlide
              arrows={false}
              dots={dots}
              cover
            />
          </div>
          <Paper className={classes.avatarWrap} elevation={0}>
            <ProfileImage userId={ad.user} />
          </Paper>
          <div
            className={classNames(classes.details, {
              [classes.withDots]: dots,
            })}
          >
            <div className={classes.titleBox}>
              <div className={classes.mainDetails}>
                <AdTitle className={classes.title} ad={ad} variant="title" />
                <AdPrice ad={ad} className={classes.price} variant="title" />
              </div>
            </div>
            <AdBody ad={ad} className={classes.description} />
            <div className={classes.placeBox}>
              <div className={classes.info}>
                <div className={classes.location}>
                  <PlaceIcon className={classes.locationIcon} />
                  <AdAddress ad={ad} color="inherit" />
                </div>
                <div className={classes.posted}>
                  <div className={classes.date}>
                    <TimeIcon className={classes.locationIcon} />
                    <AdDate ad={ad} color="inherit" />
                  </div>
                </div>
              </div>
            </div>
            <StaticMap
              id={adId}
              className={classes.map}
              center={R.path(['location', 'geoposition'], ad)}
              width={640}
              height={300}
            />
            <div className={classes.sellerBox}>
              <ProfileImage
                className={classes.avatar}
                userId={ad.user}
                size={40}
              />
              <div className={classes.verifiedWith}>
                <UserFullName userId={ad.user} />
                <VerifiedWith user={ad.user} />
              </div>
              <IconButton className={classes.profileButton}>
                <KeyboardArrowRight />
              </IconButton>
            </div>
          </div>
        </div>
        <div className={classes.actions}>
          {ad.user === uid ? (
            <RoundButton
              className={classes.actionButton}
              variant="raised"
              color="primary"
              fullWidth
              onClick={() => markAdAsSold()}
            >
              Mark as sold
            </RoundButton>
          ) : (
            <div className={classes.actionButtons}>
              <RevealPhoneButton
                ad={ad}
                component={RoundButton}
                className={classNames(classes.actionButton, classes.callButton)}
                color="primary"
                fullWidth
                size="small"
                variant="flat"
                disabled={ad.sold}
              >
                Call
              </RevealPhoneButton>
              <RoundButton
                className={classes.actionButton}
                color="primary"
                variant="raised"
                fullWidth
                size="small"
                disabled={ad.sold}
                onClick={viewConversation}
              >
                <MessageIcon />&nbsp;&nbsp;Message
              </RoundButton>
            </div>
          )}
        </div>
      </div>
    );
  }

  renderSlideshow() {
    const { imagesList, viewAd, classes } = this.props;

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
          imgixParams={{ w: 900, auto: 'compress,format' }}
          swipeToSlide
          arrows={false}
          dots
          flex
        />
      </React.Fragment>
    );
  }

  renderConversation() {
    const { uid, adId, sellerName, viewAd } = this.props;

    return (
      <Conversation
        buyerId={uid}
        adId={adId}
        variant="box"
        inputPlaceholder={`Ask ${sellerName} a question`}
        sendMessageAction={
          <IconButton onClick={viewAd}>
            <CloseIcon />
          </IconButton>
        }
      />
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

const mapDispatchToProps = (dispatch, { adId }) =>
  bindActionCreators(
    {
      markAdAsSold: () => dataActions.markAdAsSold(adId),
    },
    dispatch,
  );

export default R.compose(
  hydrateAd(propSelector('adId'), propSelector('legacy')),
  connect(mapStateToProps, mapDispatchToProps),
  withProps(
    createStructuredSelector({
      imagesList: R.compose(R.values, R.pathOr({}, ['ad', 'images'])),
    }),
  ),
  branch(
    propSelector(['ad', 'user']),
    withProfileData(
      {
        sellerName: ['displayName'],
      },
      propSelector(['ad', 'user']),
    ),
  ),
  withStateHandlers(
    {
      view: 'ad',
    },
    {
      viewSlideShow: () => () => ({
        view: 'slideshow',
      }),
      viewConversation: () => () => ({
        view: 'conversation',
      }),
      viewAd: () => () => ({
        view: 'ad',
      }),
    },
  ),
  withStyles(styles),
)(MobileViewAd);