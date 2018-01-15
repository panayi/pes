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
  setUserLocation: userActions.setUserLocation,
};

const maybeSetUserLocation = async props => {
  const { hasUid, setUserLocation } = props;

  if (!hasUid) {
    return null;
  }

  const location = await geolocationService.getCurrentPosition();
  return setUserLocation(location);
};

const setUserLocation = R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      maybeSetUserLocation(this.props);
    },
    componentWillReceiveProps(nextProps) {
      const previouslyHadUid = this.props.hasUid;
      if (!previouslyHadUid) {
        maybeSetUserLocation(nextProps);
      }
    },
  }),
);

export default setUserLocation;
