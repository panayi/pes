import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { connect } from 'react-redux';
import { withProps, setStatic } from 'recompose';
import { createSelector, createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import withStyles from '@material-ui/core/styles/withStyles';
import propSelector from '@pesposa/core/src/utils/propSelector';
import * as urlPaths from '@pesposa/core/src/selectors/urlPaths';
import { models } from '@pesposa/client-core/src/store/firebase/data';
import { selectors as authSelectors } from '@pesposa/client-core/src/store/firebase/auth';
import { selectors as routerSelectors } from '@pesposa/client-core/src/store/router';
import Layout from '@pesposa/client-core/src/layouts/Layout/Layout';
import getMetaTags from 'utils/getMetaTags';
import RegisterExternalUser from 'modules/RegisterExternalUser/RegisterExternalUser';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.common.white,
    textAlign: 'center',
  },
});

export class Sell extends React.Component {
  componentDidMount() {
    this.navigate();
  }

  componentDidUpdate() {
    this.navigate();
  }

  navigate() {
    const {
      code,
      adId,
      isAuthenticating,
      externalUserId,
      userId,
      isCurrentUser,
      sellerAds,
      history,
    } = this.props;

    // Wait for authentication to complete
    if (isAuthenticating) {
      return null;
    }

    // Currently logged-in user is externalUser.user
    if (isCurrentUser) {
      return null;
    }

    // ExternalUser for passed code was not found
    if (isNilOrEmpty(externalUserId)) {
      return history.replace('/');
    }

    // ExternalUser is a registered user
    if (!isNilOrEmpty(userId)) {
      return history.replace(`/user/${userId}`);
    }

    // ExternalUser has no ads
    if (isNilOrEmpty(sellerAds)) {
      return history.replace('/');
    }

    const ad = R.find(R.propEq('id', adId), sellerAds);
    if (!ad) {
      const firstAdId = R.compose(R.prop('id'), R.head)(sellerAds);
      return history.replace(urlPaths.sell({ code, adId: firstAdId }));
    }

    return null;
  }

  render() {
    const {
      code,
      adId,
      externalUserId,
      isCurrentUser,
      isAuthenticating,
      location,
      classes,
    } = this.props;

    return (
      <React.Fragment>
        <Helmet
          {...getMetaTags({
            title: 'Sell your items on Pesposa',
            path: location.pathname,
          })}
        />
        <Layout pageClassName={classes.root} header={<Header />}>
          <RegisterExternalUser
            code={code}
            adId={adId}
            externalUserId={externalUserId}
            isCurrentUser={isCurrentUser}
            isAuthenticating={isAuthenticating}
          />
        </Layout>
        <Footer />
      </React.Fragment>
    );
  }
}

const codeSelector = routerSelectors.routeParamSelector('code');
const adIdSelector = routerSelectors.routeParamSelector('adId');
const externalUserCodeConnection = models.externalUserCodes.one(codeSelector);
const userIdConnection = models.externalUsers
  .one(externalUserCodeConnection.selector)
  .child(['user']);
const sellerAdsConnection = models.sellerAds(
  externalUserCodeConnection.selector,
).all;
const isCurrentUserSelector = createSelector(
  propSelector('userId'),
  propSelector('currentUserId'),
  R.equals,
);

const mapStateToProps = createStructuredSelector({
  externalUserId: externalUserCodeConnection.selector,
  userId: userIdConnection.selector,
  currentUserId: authSelectors.uidSelector,
  isAuthenticating: authSelectors.isAuthenticatingSelector,
  sellerAds: sellerAdsConnection.selector,
});

export default R.compose(
  setStatic('getInitialProps', async ({ match, store }) => {
    let props = {
      match,
    };
    let state = store.getState();
    const externalUserCodeQuery = externalUserCodeConnection.query(state, props)
      .path;

    await store.firebase.promiseEvents([
      { path: externalUserCodeQuery, type: 'once' },
    ]);
    const externalUserId = externalUserCodeConnection.selector(
      store.getState(),
      props,
    );

    // ExternalUser with passed `code` has not been found
    if (R.isNil(externalUserId)) {
      return store.getState();
    }

    props = {
      match,
      externalUserId,
    };
    state = store.getState();
    const sellerAdsQuery = sellerAdsConnection.query(state, props).path;
    const userIdQuery = userIdConnection.query(state, props).path;

    await store.firebase.promiseEvents([
      { path: sellerAdsQuery, type: 'once' },
      { path: userIdQuery, type: 'once' },
    ]);

    return store.getState();
  }),
  connect(mapStateToProps),
  withProps(
    createStructuredSelector({
      code: codeSelector,
      adId: adIdSelector,
      isCurrentUser: isCurrentUserSelector,
    }),
  ),
  withStyles(styles),
)(Sell);
