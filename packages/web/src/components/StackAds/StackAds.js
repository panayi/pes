// /* @flow */
// import React from 'react';
// import * as R from 'ramda';
// import classNames from 'classnames';
// import { withStateHandlers } from 'recompose';
// import { bindActionCreators } from 'redux';
// import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
// import Typography from 'material-ui/Typography';
// import Button from 'material-ui/Button';
// import IconButton from 'material-ui/IconButton';
// import Divider from 'material-ui/Divider'
// import { LinearProgress } from 'material-ui/Progress';
// import { withStyles } from 'material-ui/styles';
// import { red } from 'material-ui/colors';
// import PlaceIcon from 'material-ui-icons/Place';
// import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
// import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
// import FavoriteIcon from 'material-ui-icons/FavoriteBorder';
// import DotIcon from 'material-ui-icons/FiberManualRecord';
// import InfoIcon from 'material-ui-icons/Info';
// import CloseIcon from 'material-ui-icons/Close';
// import propSelector from '@pesposa/core/src/utils/propSelector';
// import hydrateAd from 'hocs/hydrateAd';
// import urlForPath from 'utils/urlForPath';
// import { selectors as authSelectors } from 'store/firebase/auth';
// import { actions as dataActions } from 'store/firebase/data';
// import ShareIcon from 'mdi-react/ShareIcon';
// import RoundButton from 'components/RoundButton/RoundButton';
// import LinkToViewAd from 'components/LinkToViewAd/LinkToViewAd';
// import Imgix from 'components/Imgix/Imgix';
// import AdTitle from 'components/AdTitle/AdTitle';
// import AdPrice from 'components/AdPrice/AdPrice';
// import AdBody from 'components/AdBody/AdBody';
// import AdAddress from 'components/AdAddress/AdAddress';
// import AdDate from 'components/AdDate/AdDate';
// import ProfileImage from 'components/ProfileImage/ProfileImage';
// import UserFullName from 'components/UserFullName/UserFullName';
// import SendMessage from 'components/SendMessage/SendMessage';
// import FacebookShareButton from 'components/FacebookShareButton/FacebookShareButton';
// import TwitterShareButton from '../TwitterShareButton/TwitterShareButton';
// import EmailShareButton from '../EmailShareButton/EmailShareButton';
// import ImageSlider from '../ImageSlider/ImageSlider';
// import StaticMap from '../StaticMap/StaticMap';
// import EditAdLink from '../EditAdLink/EditAdLink';
// import BrowseAds from '../BrowseAds/BrowseAds';
// import SellerBox from '../SellerBox/SellerBox';
// import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
// import VerifiedWith from '../VerifiedWith/VerifiedWith';
// import Action from '../Action/Action';

// type Props = {
//   ad: Ad,
//   adId: string,
//   location: Object,
//   uid: string,
//   markAdAsSold: Function,
//   classes: Object,
// };

// const BASE_HEIGHT = 592;
// const gutters = (theme, styles = {}) => ({
//   paddingLeft: theme.spacing.unit * 2,
//   paddingRight: theme.spacing.unit * 2,
//   ...styles,
// })


// const styles = theme => !console.log(theme) && ({
//   root: {
//     // position: 'relative',
//     // width: '100vw',
//     // height: '100vh',
//   },

//   // Background image
//   image: {
//     position: 'absolute',
//     top: 0,
//     width: '100%',
//     height: '100%',
//     backgroundSize: 'cover',
//   },

//   // Header
//   header: gutters(theme, {
//     position: 'absolute',
//     top: 0,
//     zIndex: 3,
//     width: '100%',
//     display: 'flex',
//     alignItems: 'center',
//     paddingTop: theme.spacing.unit * 4,
//     paddingBottom: theme.spacing.unit * 4,
//     color: theme.palette.common.white,
//     outline: 0,
//   }),
//   closeButton: {
//     '& svg': {
//       width: 30,
//       height: 30,
//     }
//   },
//   flex: {
//     flex: 1,
//   },
//   price: {
//     justifySelf: 'flex-end',
//     fontWeight: theme.typography.fontWeightBold,
//   },

//   // Actions
//   actions: gutters(theme, {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     display: 'flex',
//     paddingBottom: theme.spacing.unit * 2,
//     color: theme.palette.common.white,
//   }),
//   actionButtons: {
//     flex: 1,
//     display: 'flex',
//     padding: [0, theme.spacing.unit]
//   },
//   actionButton: {
//     margin: [0, theme.spacing.unit]
//   },
//   actionIcon: {
//     '& svg': {
//       width: 40,
//       height: 40,
//       fill: 'currentColor'
//     }
//   },

//   // Panel
//   panelWrap: {
//     overflow: 'hidden',
//   },
//   panel: gutters(theme, {
//     position: 'relative',
//     display: 'flex',
//     flexDirection: 'column',
//     height: 'calc(100vh - 112px)',
//     marginTop: 112,
//     transform: 'translateY(calc(100vh - 284px))',
//     borderTop: [5, 'solid', 'rgba(255, 255, 255, 0.3)'],
//     color: theme.palette.common.white,
//     textShadow: '0 1px 3px rgba(0,0,0,.8)',
//     outline: 'none',
//     transition: theme.transitions.create('transform', {
//       duration: theme.transitions.duration.shorter,
//       easing: theme.transitions.easing.easeIn,
//     })
//   }),
//   panelBackground: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     zIndex: -1,
//     width: '100%',
//     height: '100%',
//     background: theme.palette.common.black,
//     opacity: 0.2,
//     transition: theme.transitions.create('opacity', {
//       duration: theme.transitions.duration.shorter,
//       easing: theme.transitions.easing.sharp,
//     })
//   },
//   mainDetails: {
//     display: 'flex',
//     alignItems: 'center',
//     padding: [theme.spacing.unit * 2, 0]
//   },
//   avatar: {
//     background: theme.palette.common.white,
//     boxShadow: [0, 0, 0, 2, theme.palette.common.white],
//   },
//   titlePriceWrap: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     paddingLeft: theme.spacing.unit * 2
//   },
//   title: {
//     marginBottom: theme.spacing.unit / 2,
//     // fontWeight: theme.typography.fontWeight,
//   },
//   moreInfoButton: {
//     color: theme.palette.common.white,
//     '& svg': {
//       width: 30,
//       height: 30,
//     }
//   },
//   additionalDetails: {
//     opacity: 0,
//     transition: theme.transitions.create('opacity', {
//       duration: (2 / 3) * theme.transitions.duration.shorter,
//       easing: theme.transitions.easing.sharp,
//       delay: theme.transitions.duration.shorter / 3,
//     })
//   },
//   name: {
//     marginLeft: 60,
//     marginBottom: theme.spacing.unit * 2,
//     paddingLeft: theme.spacing.unit * 2,
//     fontWeight: theme.typography.fontWeightBold
//   },
//   description: gutters(theme, {
//     margin: [theme.spacing.unit, 0, theme.spacing.unit * 2, 60],
//     wordBreak: 'break-word',
//     fontSize: '1rem',
//   }),
//   locationDateWrap: {
//     flex: 1,
//     display: 'flex',
//     marginBottom: theme.spacing.unit * 2,
//     marginLeft: 60,
//     paddingLeft: theme.spacing.unit * 2,
//   },
//   mapWrap: {
//     paddingTop: theme.spacing.unit * 2,
//     paddingBottom: theme.spacing.unit * 2,
//   },
//   map: {
//     maxWidth: '100%',
//     height: 'auto',
//     borderRadius: theme.borderRadius.md
//   },
//   panelOpened: {
//     '& $panelWrap': {
//       overflowY: 'auto',
//     },
//     '& $panel': {
//       transform: 'translateY(0)',
//     },
//     '& $panelBackground': {
//       opacity: 0.7
//     },
//     '& $additionalDetails': {
//       opacity: 1,
//     },
//     '& $closeButton': {
//       border: [4, 'solid']
//     }
//   },
//   ad: {
//     display: 'block'
//   },

//   // Slideshow
//   slideshow: {
//     display: 'none',
//     height: '100vh',
//     width: '100vw',
//     backgroundColor: theme.palette.common.black,
//     '& $header': {
//       justifyContent: 'flex-end',
//     }
//   },
//   imageProgress: {
//     position: 'absolute',
//     bottom: 167,
//     width: '100%'
//   },
//   imagesProgressRoot: {
//     background: theme.palette.grey[800]
//   },
//   imagesProgressBar: {
//     background: theme.palette.common.white
//   },
//   imagesProgressDeterminateBar: {
//     transitionDuration: theme.transitions.duration.shortest
//   },

//   slideshowOpened: {
//     '& $ad': {
//       display: 'none'
//     },
//     '& $slideshow': {
//       display: 'block'
//     }
//   },

//    ///

//   images: {
//     // width: '100%',
//     // height: '100vh',
//     // position: 'relative',
//     // display: 'flex',
//     // alignItems: 'center',
//     // borderRadius: [theme.borderRadius.xl, 0, 0, theme.borderRadius.xl],
//     // backgroundColor: theme.palette.grey[900],
//   },
//   // header: gutters(theme, {
//   //   marginTop: theme.spacing.unit * 3,
//   // }),

//   dotSeparator: {
//     padding: [0, theme.spacing.unit * 1.5],
//     '& svg': {
//       width: 7,
//       height: 7,
//     }
//   },
//   seller: gutters(theme, {
//     display: 'flex',
//   }),
//   sellerName: gutters(theme, {
//     display: 'flex',
//     flexDirection: 'column',
//   }),
//   verifiedWith: {
//     color: theme.palette.text.secondary
//   },
//   action: {
//     flex: 1,
//     marginLeft: theme.spacing.unit * 2
//   },
//   divider: {
//     margin: [theme.spacing.unit * 2, theme.spacing.unit / 2]
//   },
// });

// class StackAds extends React.Component<Props> {
//   static defaultProps = {
//     ad: {},
//   };

//   openPanel = (e) => {
//     e.stopPropagation();
//     if (!this.props.panelOpened) {
//       this.props.openPanel();
//     }
//   }

//   closePanel = (e) => {
//     e.stopPropagation();
//     this.props.closePanel();
//   }

//   openSlideshow = (e) => {
//     e.stopPropagation();
//     this.props.openSlideshow();
//   }

//   closeSlideshow = (e) => {
//     e.stopPropagation();
//     this.props.closeSlideshow();
//   }

//   render() {
//     const { ad, adId, location, uid, markAdAsSold, panelOpened, slideshowOpened, currentSlide, setCurrentSlide, classes } = this.props;
//     const currentUrl = urlForPath(location.pathname);

//     return (
//       <div className={classNames(classes.root, { [classes.panelOpened]: panelOpened, [classes.slideshowOpened]: slideshowOpened })}>
//         <div className={classes.ad} onClick={this.openSlideshow}>
//           <Imgix
//             image={R.values(ad.images)[0]}
//             params={{ w: 900, auto: 'compress,format' }}
//           >
//             {({ src }) => (
//               <div className={classes.image} style={{ backgroundImage: `url("${src}")` }} />
//             )}
//           </Imgix>
//           <div className={classes.header} onClick={panelOpened ? this.closePanel : null} role="button" tabIndex="-1">
//             <IconButton className={classes.closeButton} color="inherit"><CloseIcon /></IconButton>
//             <div className={classes.flex} />
//             <AdPrice ad={ad} className={classes.price} variant="display1" color="inherit" />
//           </div>
//           <div className={classes.panelWrap}>
//             <div className={classes.panel} onClick={this.openPanel} role="button" tabIndex="-1">
//               <div className={classes.panelBackground} />
//               <div className={classes.mainDetails}>
//                 <ProfileImage className={classes.avatar} userId={ad.user} size={60} />
//                 <div className={classes.titlePriceWrap}>
//                   <AdTitle
//                     className={classes.title}
//                     ad={ad}
//                     variant="headline"
//                     color="inherit"
//                   />
//                 </div>
//                 <IconButton className={classes.moreInfoButton} onClick={panelOpened ? this.closePanel : null}><InfoIcon /></IconButton>
//               </div>
//               <div className={classes.additionalDetails}>
//                 <UserFullName
//                     userId={ad.user}
//                     className={classes.name}
//                     color="inherit"
//                     variant="subheading"
//                   />
//                 <div className={classes.locationDateWrap}>
//                   <AdAddress ad={ad} className={classes.address} color="inherit" />
//                   <div className={classes.dotSeparator}>
//                     <DotIcon />
//                   </div>
//                   <Typography className={classes.dateWrap} color="inherit">
//                     Posted&nbsp;
//                   </Typography>
//                   <AdDate ad={ad} color="inherit" />
//                 </div>
//                 <AdBody ad={ad} className={classes.description} color="inherit" />
//                 <div className={classes.mapWrap}>
//                   <StaticMap
//                     id={adId}
//                     className={classes.map}
//                     center={R.path(['location', 'geoposition'], ad)}
//                     width={640}
//                     height={300}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className={classes.actions}>
//             <IconButton className={classes.actionIcon} color="inherit"><ShareIcon /></IconButton>
//             <div className={classes.actionButtons}>
//               <RoundButton className={classes.actionButton} inverse fullWidth>Call</RoundButton>
//               <RoundButton className={classes.actionButton} color="primary" variant="raised" fullWidth>Chat</RoundButton>
//             </div>
//             <IconButton className={classes.actionIcon} color="inherit"><FavoriteIcon /></IconButton>
//           </div>
//         </div>
//         <div className={classes.slideshow}>
//           <div className={classes.header}>
//             <RoundButton variant="raised" onClick={this.closeSlideshow}>Back to ad</RoundButton>
//           </div>
//           {slideshowOpened && <ImageSlider
//             className={classes.slider}
//             images={R.values(ad.images)}
//             imgixParams={{ w: 900, auto: 'compress,format' }}
//             afterChange={setCurrentSlide}
//             swipeToSlide
//             arrows={false}
//             dots
//           />}
//           <div className={classes.imageProgress}>
//             <LinearProgress
//               classes={{ root: classes.imagesProgressRoot, bar: classes.imagesProgressBar, determinateBar1: classes.imagesProgressDeterminateBar }}
//               color="secondary"
//               variant="determinate"
//               value={(currentSlide + 1) / R.length(R.values(ad.images)) * 100}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = createStructuredSelector({
//   uid: authSelectors.uidSelector,
// });

// const mapDispatchToProps = (dispatch, { adId }) =>
//   bindActionCreators(
//     {
//       markAdAsSold: () => dataActions.markAdAsSold(adId),
//     },
//     dispatch,
//   );

// export default R.compose(
//   hydrateAd(propSelector('adId'), propSelector('legacy')),
//   connect(mapStateToProps, mapDispatchToProps),
//   withRouter,
//   withStateHandlers({
//     panelOpened: false,
//     slideshowOpened: false,
//     currentSlide: 0,
//   }, {
//     openPanel: () => () => ({
//       panelOpened: true
//     }),
//     closePanel: () => () => ({
//       panelOpened: false
//     }),
//     openSlideshow: () => () => ({
//       slideshowOpened: true,
//       panelOpened: false
//     }),
//     closeSlideshow: () => () => ({
//       slideshowOpened: false,
//       currentSlide: 0,
//     }),
//     setCurrentSlide: () => (index) => ({
//       currentSlide: index
//     })
//   }),
//   withStyles(styles),
// )(StackAds);
