import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { connect } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import { createStructuredSelector } from 'reselect';
import { defaultProps, branch } from 'recompose';
import { connectData } from 'lib/connectData';
import omitProps from 'utils/omitProps';
import { models } from 'store/firebase/data';
import { selectors as authSelectors } from 'store/firebase/auth';
import { selectors as profileSelectors } from 'store/firebase/profile';

const USER_ID = '___user_id';
const IS_CURRENT_USER = '____is_current_user';

const withMyProfileData = mapPropsToPaths => {
  const dataSelector = createStructuredSelector(
    R.map(
      R.compose(profileSelectors.profilePropSelector, R.prepend('profile')),
      mapPropsToPaths,
    ),
  );

  const mapStateToProps = (state, props) => {
    const data = dataSelector(state, props);
    const profile = profileSelectors.profileSelector(state, props);

    return {
      ...data,
      isLoaded: R.map(R.always(isLoaded(profile)), data),
    };
  };

  return connect(mapStateToProps, {});
};

const withUserProfileData = (mapPropsToPaths, userIdSelector) => {
  const mapDataToProps = R.map(
    path => models.profiles(userIdSelector).child(path),
    mapPropsToPaths,
  );

  return connectData(mapDataToProps, null, {});
};

const withProfileData = (mapPropsToPaths, userIdSelector) => {
  if (R.isNil(mapPropsToPaths) || R.isNil(userIdSelector)) {
    return R.identity;
  }

  const mapStateToProps = createStructuredSelector({
    [USER_ID]: userIdSelector,
    [IS_CURRENT_USER]: authSelectors.isCurrentUserSelector(userIdSelector),
  });

  return R.compose(
    defaultProps({
      isLoaded: {},
    }),
    connect(mapStateToProps, {}),
    branch(
      R.propSatisfies(R.complement(isNilOrEmpty), USER_ID),
      branch(
        R.prop(IS_CURRENT_USER),
        withMyProfileData(mapPropsToPaths),
        withUserProfileData(mapPropsToPaths, userIdSelector),
      ),
    ),
    omitProps([USER_ID, IS_CURRENT_USER]),
  );
};

export default withProfileData;
