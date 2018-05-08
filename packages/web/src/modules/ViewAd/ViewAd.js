import React from 'react';
import * as R from 'ramda';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { XsScreen, XsScreenHidden } from 'react-responsive-redux';
import propSelector from '@pesposa/core/src/utils/propSelector';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import { selectors as paramsSelectors } from 'store/search/params';
import RequireAdult from 'components/RequireAdult/RequireAdult';
import DesktopViewAd from './DesktopViewAd/DesktopViewAd';
import MobileViewAd from './MobileViewAd/MobileViewAd';

class ViewAd extends React.Component {
  componentDidUpdate(prevProps) {
    if (propsChanged(['adId'], prevProps, this.props)) {
      setTimeout(() => window.scrollTo(0, 0), 1);
    }
  }

  render() {
    const { history } = this.props;

    return (
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
    );
  }
}

const mapStateToProps = createStructuredSelector({
  adCategory: paramsSelectors.categoryObjectSelector(
    propSelector(['ad', 'category']),
  ),
});

export default R.compose(connect(mapStateToProps), withRouter)(ViewAd);
