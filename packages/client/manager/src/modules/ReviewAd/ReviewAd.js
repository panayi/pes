import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { withProps } from 'recompose';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import withStyles from '@material-ui/core/styles/withStyles';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { connectData } from '@pesposa/client-core/src/lib/connectData';
import { models } from '@pesposa/client-core/src/store/firebase/data';
import { routeParamSelector } from '@pesposa/client-core/src/store/router/selectors';
import { actions as modalActions } from '@pesposa/client-core/src/store/modals';
import withSpinnerWhen from '@pesposa/client-core/src/hocs/withSpinnerWhen';
import ReduxModal from '@pesposa/client-core/src/components/Modal/ReduxModal/ReduxModal';
import { actions as reviewAdTasksActions } from 'store/reviewAdTasks';
import Panel from 'components/Panel/Panel';
import ApproveButton from 'components/ApproveButton/ApproveButton';
import RejectButton from 'components/RejectButton/RejectButton';
import Ad from '../Ad/Ad';
import Checklist from './Checklist/Checklist';
import SellerAds from './SellerAds/SellerAds';
import SimilarAds from './SimilarAds/SimilarAds';
import SelectRejectionReason from './SelectRejectionReason/SelectRejectionReason';

const TABS = {
  checklist: null,
  otherAdsBySeller: 'seller-ads',
  similarAds: 'similar-ads',
};
const SELECT_REJECTION_REASON_MODAL_ID = 'selectRejectionReason';

const styles = theme => ({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  ad: {
    height: 300,
    maxHeight: '50%',
    background: theme.palette.common.white,
  },
  tabs: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    borderTop: [1, 'solid', theme.palette.divider],
  },
  tabsRoot: {
    borderBottom: [1, 'solid', theme.palette.divider],
  },
  tabContainer: {
    display: 'flex',
    flex: 1,
  },
  headerButton: {
    marginRight: theme.spacing.unit * 2,
  },
});

class ReviewAd extends React.Component {
  handleAccept = async () => {
    const { adId, approve } = this.props;
    return approve(adId);
  };

  handleReject = async rejectionReason => {
    const { adId, reject } = this.props;
    return reject(adId, rejectionReason);
  };

  render() {
    const {
      reviewAdTask,
      adId,
      openModal,
      currentTab,
      basePath,
      spinner,
      history,
      match,
      classes,
    } = this.props;
    const afterAd = R.prop('afterAd', reviewAdTask);
    const beforeAd = R.prop('beforeAd', reviewAdTask);
    const seller = R.path(['afterAd', 'seller'], reviewAdTask);
    const isUpdate = !!beforeAd;

    return (
      <Panel
        classes={{
          header: classes.header,
        }}
        header={
          reviewAdTask ? (
            <React.Fragment>
              <Typography variant="subheading">
                <span>
                  Ad was <strong>{isUpdate ? 'UPDATED' : 'CREATED'}</strong>
                </span>
              </Typography>
              <div>
                <RejectButton
                  className={classes.headerButton}
                  onClick={() => openModal(SELECT_REJECTION_REASON_MODAL_ID)}
                >
                  Reject
                </RejectButton>
                <ApproveButton
                  className={classes.headerButton}
                  onClick={this.handleAccept}
                >
                  Approve
                </ApproveButton>
              </div>
            </React.Fragment>
          ) : null
        }
      >
        <div className={classes.root}>
          {spinner}
          <div className={classes.ad}>
            <Ad adId={adId} ad={afterAd} beforeAd={beforeAd} />
          </div>
          <div className={classes.tabs}>
            <Tabs
              classes={{ root: classes.tabsRoot }}
              indicatorColor="primary"
              textColor="primary"
              value={currentTab}
              onChange={(event, value) =>
                value
                  ? history.push(`${basePath}/${adId}/${value}`)
                  : history.push(`${basePath}/${adId}`)
              }
            >
              <Tab label="Checklist" value={TABS.checklist} />
              <Tab label="Other ads by seller" value={TABS.otherAdsBySeller} />
              <Tab label="Similar ads" value={TABS.similarAds} />
            </Tabs>
            <div className={classes.tabContainer}>
              {currentTab === TABS.checklist && <Checklist />}
              {currentTab === TABS.otherAdsBySeller &&
                seller && (
                  <SellerAds
                    reviewAdId={adId}
                    seller={seller}
                    basePath={`${basePath}/${adId}/${TABS.otherAdsBySeller}`}
                    match={match}
                  />
                )}
              {currentTab === TABS.similarAds && (
                <SimilarAds
                  ad={afterAd}
                  adId={adId}
                  basePath={`${basePath}/${adId}/${TABS.similarAds}`}
                />
              )}
            </div>
          </div>
        </div>
        <ReduxModal
          id={SELECT_REJECTION_REASON_MODAL_ID}
          content={SelectRejectionReason}
          contentProps={{
            isUpdate,
            onReject: this.handleReject,
          }}
        />
      </Panel>
    );
  }
}

ReviewAd.defaultProps = {
  reviewAdTask: {},
};

const mapDataToProps = {
  reviewAdTask: models.reviewAdTasks.one(propSelector(['adId'])),
};

const mapDispatchToProps = {
  approve: reviewAdTasksActions.approve,
  reject: reviewAdTasksActions.reject,
  openModal: modalActions.openModal,
};

export default R.compose(
  withProps(
    createStructuredSelector({
      adId: routeParamSelector('adId'),
      currentTab: R.compose(
        R.defaultTo(null),
        routeParamSelector('tab'),
      ),
    }),
  ),
  connectData(mapDataToProps, null, mapDispatchToProps),
  withSpinnerWhen(R.propSatisfies(isNilOrEmpty, 'reviewAdTask'), {
    centered: true,
    overlay: true,
  }),
  withRouter,
  withStyles(styles),
)(ReviewAd);
