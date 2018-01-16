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

  const location = await geolocationService.getCurrentPosition();
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
