import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { branch } from 'recompose';
import { connectData } from 'lib/connectData';
import omitProps from 'utils/omitProps';
import { models } from 'store/firebase/data';
import { selectors as authSelectors } from 'store/firebase/auth';
import { selectors as profileSelectors } from 'store/firebase/profile';

const IS_CURRENT_USER = '____is_current_user';

const withMyProfileData = mapPropsToPaths => {
  const mapStateToProps = createStructuredSelector(
    R.map(
      R.compose(profileSelectors.profilePropSelector, R.prepend('profile')),
      mapPropsToPaths,
    ),
  );

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
    [IS_CURRENT_USER]: authSelectors.isCurrentUserSelector(userIdSelector),
  });

  return R.compose(
    connect(mapStateToProps, {}),
    branch(
      R.prop(IS_CURRENT_USER),
      withMyProfileData(mapPropsToPaths),
      withUserProfileData(mapPropsToPaths, userIdSelector),
    ),
    omitProps([IS_CURRENT_USER]),
  );
};

export default withProfileData;
