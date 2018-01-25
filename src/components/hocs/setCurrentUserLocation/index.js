import * as R from 'ramda';
import { lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as geolocationService from 'services/geolocation';
import { selectors as authSelectors } from 'store/auth';
import { actions as profileActions } from 'store/profile';

const mapStateToProps = createStructuredSelector({
  hasUid: authSelectors.hasUidSelector,
});

const mapDispatchToProps = {
  setCurrentUserLocation: profileActions.setCurrentUserLocation,
};

const maybeSetCurrentUserLocation = async props => {
  const { hasUid, setCurrentUserLocation } = props;

  if (!hasUid) {
    return null;
  }

  let geoposition = null;
  try {
    geoposition = await geolocationService.getCurrentPosition();
  } catch (error) {
    console.warn(error); // eslint-disable-line no-console
  }

  // Set the location even when it fails,
  // because we can't trust the accuracy of any existing user.location.geoposition,
  // and we'll rely on user.locationFropIp.geoposition
  return setCurrentUserLocation(geoposition);
};

const setCurrentUserLocation = R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      maybeSetCurrentUserLocation(this.props);
    },
    componentDidUpdate(prevProps) {
      const previouslyHadUid = prevProps.hasUid;
      if (!previouslyHadUid) {
        maybeSetCurrentUserLocation(this.props);
      }
    },
  }),
);

export default setCurrentUserLocation;
