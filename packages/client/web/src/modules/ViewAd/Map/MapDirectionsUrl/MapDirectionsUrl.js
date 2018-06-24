import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import env from '@pesposa/core/src/config/env';
import { selectors as userInfoSelectors } from '@pesposa/client-core/src/store/userInfo';

const BASE_URL = `https://www.google.com/maps/embed/v1/directions?key=${
  env.googleApisKey
}`;

class MapDirectionsUrl extends React.Component {
  getUrl() {
    const { ad, location } = this.props;
    const userGeoposition = R.prop('geoposition', location);
    const adGeoposition = R.path(['location', 'geoposition'], ad);

    if (isNilOrEmpty(userGeoposition) || isNilOrEmpty(adGeoposition)) {
      return null;
    }

    return `${BASE_URL}&origin=${userGeoposition.latitude},${
      userGeoposition.longitude
    }&destination=${adGeoposition.latitude},${adGeoposition.longitude}`;
  }

  render() {
    const { children } = this.props;
    return children({
      url: this.getUrl(),
    });
  }
}

const mapStateToProps = createStructuredSelector({
  location: userInfoSelectors.locationSelector,
});

export default connect(mapStateToProps)(MapDirectionsUrl);
