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
  setCurrentUserGeoposition: userActions.setCurrentUserGeoposition,
};

const maybeSetCurrentUserGeoposition = async props => {
  const { hasUid, setCurrentUserGeoposition } = props;

  if (!hasUid) {
    return null;
  }

  let geoposition = null;
  try {
    geoposition = await geolocationService.getCurrentPosition();
  } catch (error) {
    console.warn(error); // eslint-disable-line no-console
  }

  // Set the geoposition even when it fails,
  // because we can't trust the accuracy of any existing user.geoposition,
  // and we'll rely on geopositionFromIp
  return setCurrentUserGeoposition(geoposition);
};

const setCurrentUserGeoposition = R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      maybeSetCurrentUserGeoposition(this.props);
    },
    componentDidUpdate(prevProps) {
      const previouslyHadUid = prevProps.hasUid;
      if (!previouslyHadUid) {
        maybeSetCurrentUserGeoposition(this.props);
      }
    },
  }),
);

export default setCurrentUserGeoposition;
