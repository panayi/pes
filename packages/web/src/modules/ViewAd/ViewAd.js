import React from 'react';
import * as R from 'ramda';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { XsScreen, XsScreenHidden } from 'react-responsive-redux';
import propSelector from '@pesposa/core/src/utils/propSelector';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import { track } from 'services/mixpanel';
import { selectors as paramsSelectors } from 'store/search/params';
import ScrollManager from 'components/ScrollManager/ScrollManager';
import RequireAdult from 'components/RequireAdult/RequireAdult';
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
    setTimeout(
      () =>
        track('viewAd', {
          id: this.props.adId,
          title: window.document.title,
        }),
      1000,
    );
  }

  render() {
    const { history } = this.props;

    return (
      <ScrollManager>
        <RequireAdult
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
      </ScrollManager>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  adCategory: paramsSelectors.categoryObjectSelector(
    propSelector(['ad', 'category']),
  ),
});

export default R.compose(connect(mapStateToProps), withRouter)(ViewAd);
