import React from 'react';
import * as R from 'ramda';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { XsScreen, XsScreenHidden } from 'react-responsive-redux';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { selectors as paramsSelectors } from 'store/search/params';
import RequireAdult from 'components/RequireAdult/RequireAdult';
import DesktopViewAd from './DesktopViewAd/DesktopViewAd';
import MobileViewAd from './MobileViewAd/MobileViewAd';

const ViewAd = props => (
  <RequireAdult
    enabled={R.path(['adCategory', 'requireAdult'], props)}
    onReject={() => props.history.replace('/')}
  >
    <XsScreenHidden>
      <DesktopViewAd {...props} />
    </XsScreenHidden>
    <XsScreen component={React.Fragment}>
      <MobileViewAd {...props} />
    </XsScreen>
  </RequireAdult>
);

const mapStateToProps = createStructuredSelector({
  adCategory: paramsSelectors.categoryObjectSelector(
    propSelector(['ad', 'category']),
  ),
});

export default R.compose(connect(mapStateToProps), withRouter)(ViewAd);
