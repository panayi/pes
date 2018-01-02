import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createStructuredSelector } from 'reselect';
import { withProps, mapProps, branch, renderNothing } from 'recompose';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Avatar } from 'material-ui';
import Face from 'material-ui-icons/Face';
import { selectors as profileSelectors } from 'store/profile';

const mapStateToProps = createStructuredSelector({
  isProfileLoaded: profileSelectors.isProfileLoadedSelector,
  src: profileSelectors.profilePropSelector(['profile', 'avatarUrl']),
});

const connectProfileImage = R.compose(
  firebaseConnect(),
  connect(mapStateToProps),
  branch(R.compose(R.not, R.prop('isProfileLoaded')), renderNothing),
  withProps(({ src, withDefault }) => ({
    children: withDefault && isNilOrEmpty(src) ? <Face /> : null,
  })),
  mapProps(R.pick(['size', 'src', 'children'])),
);

const ProfileImage = connectProfileImage('img');

ProfileImage.Avatar = connectProfileImage(Avatar);

export default ProfileImage;
