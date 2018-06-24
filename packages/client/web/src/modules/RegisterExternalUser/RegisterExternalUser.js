import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import classNames from 'classnames';
import { withProps } from 'recompose';
import { withRouter } from 'react-router-dom';
import { createSelector, createStructuredSelector } from 'reselect';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { connectData } from '@pesposa/client-core/src/lib/connectData';
import { deserializeAdSelector } from '@pesposa/core/src/selectors/ads';
import { models } from '@pesposa/client-core/src/store/firebase/data';
import { actions as modalActions } from '@pesposa/client-core/src/store/modals';
import { selectors as authSelectors } from '@pesposa/client-core/src/store/firebase/auth';
import Spinner from '@pesposa/client-core/src/components/Spinner/Spinner';
import Button from '@pesposa/client-core/src/components/Button/Button';
import ReduxModal from '@pesposa/client-core/src/components/Modal/ReduxModal/ReduxModal';
import Support from 'modules/Support/Support';
import Headline from './Headline/Headline';
import AdsList from './AdsList/AdsList';
import Faq from './Faq/Faq';
import Migrate from './Migrate/Migrate';
import DeleteAds from './DeleteAds/DeleteAds';
import FoundOnSource from './FoundOnSource/FoundOnSource';
import memphisColorful from './images/memphis-bg.png';

const MIGRATE_MODAL_ID = 'migrate';
const ADS_SECTION_BG_COLOR = '#05323F';

const styles = theme => ({
  adSection: {
    paddingTop: theme.spacing.unit * 7,
    paddingBottom: theme.spacing.unit * 9,
    position: 'relative',
    '&:before': {
      content: '""',
      background: `url(${memphisColorful})`,
      opacity: 0.7,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      position: 'absolute',
      zIndex: 0,
    },
  },
  adBoxContent: {
    position: 'relative',
    zIndex: 1,
  },
  adsListWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 3,
  },
  adsList: {
    width: 300,
  },
  adSource: {
    marginTop: theme.spacing.unit,
  },
  adAction: {
    display: 'inline',
    borderBottom: [1, 'dashed', theme.palette.text.secondary],
  },
  actionSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    padding: [theme.spacing.unit * 9, 0, theme.spacing.unit * 10, 0],
    borderTop: [1, 'solid', theme.palette.divider],
    background: ADS_SECTION_BG_COLOR,
  },
  actionHeadline: {
    color: `rgba(255, 255, 255, 0.95)`,
  },
  signUpText: {
    marginTop: theme.spacing.unit / 2,
    fontSize: '1.125rem',
    color: `rgba(255, 255, 255, 0.8)`,
  },
  actionButton: {
    marginTop: theme.spacing.unit,
    minWidth: 200,
    minHeight: 54,
    fontSize: '1.125rem',
  },
  leftActionButton: {
    color: theme.palette.getContrastText(ADS_SECTION_BG_COLOR),
    marginRight: theme.spacing.unit * 2,
  },
  faqSection: {
    textAlign: 'left',
    maxWidth: 1032,
    margin: [0, 'auto'],
    paddingTop: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 13,
  },
  faqHeadline: {
    marginBottom: theme.spacing.unit * 6,
  },
});

export class RegisterExternalUser extends React.Component {
  goHome = () => {
    const { history } = this.props;
    history.replace('/');
  };

  goToProfile = () => {
    const { currentUserId, history } = this.props;
    history.replace(`/user/${currentUserId}`);
  };

  handleSignUpClick = () => {
    const { code, openModal } = this.props;
    openModal('login', {
      title: 'Sign up to claim your ads',
      signUp: true,
      onSuccess: () =>
        openModal(MIGRATE_MODAL_ID, {
          code,
          goToProfile: this.goToProfile,
          goHome: this.goHome,
        }),
    });
  };

  renderHasAds() {
    const { adId, sellerAds, classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.adSection}>
          <div className={classes.adBoxContent}>
            <Headline>Your item is listed on Pesposa</Headline>
            <div className={classes.adsListWrap}>
              <AdsList
                className={classes.adsList}
                ads={sellerAds}
                currentAdId={adId}
                onAdClick={this.handleSignUpClick}
              >
                {props => (
                  <div className={classes.adSource}>
                    {props.source ? (
                      <FoundOnSource source={props.source} />
                    ) : null}
                  </div>
                )}
              </AdsList>
            </div>
          </div>
        </div>
        <div className={classes.actionSection}>
          <div>
            <Headline className={classes.actionHeadline}>
              People are interested in your items
            </Headline>
            <Typography
              className={classes.signUpText}
              color="inherit"
              variant="headline"
              paragraph
            >
              Sign up to respond to potential buyers and sell your items faster.
            </Typography>
            <Button
              className={classes.actionButton}
              variant="raised"
              color="primary"
              size="large"
              onClick={this.handleSignUpClick}
            >
              Sign up
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderNoAds() {
    const { classes } = this.props;

    return (
      <div className={classes.actionSection}>
        <div>
          <Headline className={classes.actionHeadline} paragraph>
            No ads found
          </Headline>
          <Button
            className={classes.actionButton}
            onClick={this.goHome}
            variant="raised"
            color="primary"
          >
            Go to Pesposa Home
          </Button>
        </div>
      </div>
    );
  }

  renderExternalUserAlreadyRegistered() {
    const { classes } = this.props;

    return (
      <div className={classes.actionSection}>
        <div>
          <Headline className={classes.actionHeadline} paragraph>
            Your ads are connected to your account!
          </Headline>
          <Button
            className={classNames(
              classes.actionButton,
              classes.leftActionButton,
            )}
            size="large"
            onClick={this.goHome}
          >
            Go to Pesposa Home
          </Button>
          <Button
            className={classes.actionButton}
            variant="raised"
            color="primary"
            size="large"
            onClick={this.goToProfile}
          >
            View your ads
          </Button>
        </div>
      </div>
    );
  }

  renderContent() {
    const { sellerAds, isCurrentUser, isAuthenticating, classes } = this.props;

    if (isAuthenticating) {
      return (
        <div className={classes.actionSection}>
          <Spinner centered />
        </div>
      );
    }

    if (isCurrentUser) {
      return this.renderExternalUserAlreadyRegistered();
    }

    if (isNilOrEmpty(sellerAds)) {
      return this.renderNoAds();
    }

    return this.renderHasAds();
  }

  render() {
    const { adId, sellerAds, code, openModal, classes } = this.props;

    return (
      <React.Fragment>
        {this.renderContent()}
        <div className={classes.faqSection}>
          <Headline className={classes.faqHeadline}>
            Frequently asked questions
          </Headline>
          <Faq
            onSignUpClick={this.handleSignUpClick}
            onDeleteAdsClick={() =>
              openModal('deleteAds', {
                ads: sellerAds,
                currentAdId: adId,
                code,
              })
            }
            onContactClick={() => openModal('support')}
          />
        </div>
        <ReduxModal
          id={MIGRATE_MODAL_ID}
          content={Migrate}
          disableBackdropClick
          disableEscapeKeyDown
        />
        <ReduxModal id="deleteAds" content={DeleteAds} />
        <ReduxModal id="support" content={Support} />
      </React.Fragment>
    );
  }
}

const sellerAdsSelector = createSelector(
  propSelector('sellerAds'),
  propSelector('adId'),
  (sellerAds, adId) => {
    const finalSellerAds = R.compose(
      R.map(ad => deserializeAdSelector({ ad })),
      R.defaultTo([]),
    )(sellerAds);
    const currentAdIndex = R.findIndex(R.propEq('id', adId), finalSellerAds);

    if (currentAdIndex < 0) {
      return finalSellerAds;
    }

    const currentAd = R.nth(currentAdIndex, finalSellerAds);
    return R.compose(
      R.prepend(currentAd),
      R.remove(currentAdIndex, 1),
    )(finalSellerAds);
  },
);

const mapDataToProps = {
  sellerAds: models.sellerAds(propSelector('externalUserId')).all,
};

const mapStateToProps = createStructuredSelector({
  currentUserId: authSelectors.uidSelector,
});

const mapDispatchToProps = {
  openModal: modalActions.openModal,
};

export default R.compose(
  connectData(mapDataToProps, mapStateToProps, mapDispatchToProps),
  withProps(
    createStructuredSelector({
      sellerAds: sellerAdsSelector,
      userId: propSelector('userId'),
    }),
  ),
  withRouter,
  withStyles(styles),
)(RegisterExternalUser);
