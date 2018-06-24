import React from 'react';
import * as R from 'ramda';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { XsScreen, XsScreenHidden } from 'react-responsive-redux';
import propSelector from '@pesposa/core/src/utils/propSelector';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import { track } from '@pesposa/client-core/src/services/mixpanel';
import { selectors as paramsSelectors } from '@pesposa/client-core/src/store/search/params';
import RequireAdult from '@pesposa/client-core/src/components/RequireAdult/RequireAdult';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';
import DesktopViewAd from './DesktopViewAd/DesktopViewAd';
import MobileViewAd from './MobileViewAd/MobileViewAd';

class ViewAd extends React.Component {
  componentDidMount() {
    this.trackViewAd();
  }

  componentDidUpdate(prevProps) {
    if (propsChanged(['adId'], this.props, prevProps)) {
      this.trackViewAd();
    }
  }

  trackViewAd() {
    const { adId } = this.props;
    setTimeout(
      () =>
        track('viewAd', {
          id: adId,
          title: window.document.title,
        }),
      1000,
    );
  }

  render() {
    const { history } = this.props;

    return (
      <ScrollToTop>
        <RequireAdult
          id="ViewAd-confirmAdult"
          enabled={R.path(['adCategory', 'requireAdult'], this.props)}
          onReject={() => history.replace('/')}
        >
          <XsScreenHidden>
            <DesktopViewAd {...this.props} />
          </XsScreenHidden>
          <XsScreen component={React.Fragment}>
            <MobileViewAd {...this.props} />
          </XsScreen>
        </RequireAdult>
      </ScrollToTop>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  adCategory: paramsSelectors.categoryObjectSelector(
    propSelector(['ad', 'category']),
  ),
});

export default R.compose(
  connect(mapStateToProps),
  withRouter,
)(ViewAd);
