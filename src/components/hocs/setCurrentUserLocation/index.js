import * as R from 'ramda';
import { lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as geolocationService from 'services/geolocation';
import { selectors as authSelectors } from 'store/auth';
import { actions as userActions } from 'store/user';

const mapStateToProps = createStructuredSelector({
  hasUid: authSelectors.hasUidSelector,
});

const mapDispatchToProps = {
  setCurrentUserLocation: userActions.setCurrentUserLocation,
};

const maybeSetCurrentUserLocation = async props => {
  const { hasUid, setCurrentUserLocation } = props;

  if (!hasUid) {
    return null;
  }

  let location = null;
  try {
    location = await geolocationService.getCurrentPosition();
  } catch (error) {
    console.warn(error); // eslint-disable-line no-console
  }

  // Set the location even when it fails,
  // because we can't trust the accuracy of any existing user.location,
  // and we'll rely on locationFromIp
  return setCurrentUserLocation(location);
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
