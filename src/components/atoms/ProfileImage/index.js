import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createStructuredSelector } from 'reselect';
import { defaultProps, branch, renderNothing } from 'recompose';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Avatar } from 'material-ui';
import Face from 'material-ui-icons/Face';
import { connectData } from 'lib/connectData';
import { selectors as profileSelectors } from 'store/profile';

const ProfileImage = ({ src, size, withDefault, component: RootComponent }) => (
  <RootComponent src={src} size={size}>
    {withDefault && isNilOrEmpty(src) ? <Face /> : null}
  </RootComponent>
);

const mapStateToProps = createStructuredSelector({
  isProfileLoaded: profileSelectors.isProfileLoadedSelector,
  src: profileSelectors.profilePropSelector(['profile', 'avatarUrl']),
});

const connectMe = R.compose(
  connect(mapStateToProps),
  branch(R.compose(R.not, R.prop('isProfileLoaded')), renderNothing),
);

const mapDataToProps = {
  // TODO: should use models,
  // but `modelConnectionsFactory` does not support /users/{uid}/profile
  src: {
    query: (state, props) => `users/${props.userId}/profile`,
    selector: (state, props) =>
      R.path(
        ['firebase', 'data', 'users', props.userId, 'profile', 'avatarUrl'],
        state,
      ),
  },
};

const connectOtherUser = R.compose(connectData(mapDataToProps));

export default R.compose(
  defaultProps({
    component: Avatar,
  }),
  firebaseConnect(),
  branch(R.prop('me'), connectMe, connectOtherUser),
)(ProfileImage);
