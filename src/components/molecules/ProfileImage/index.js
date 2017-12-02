import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { mapProps, branch, renderNothing } from 'recompose';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Avatar } from 'material-ui';
import {
  isProfileLoadedSelector,
  profilePropSelector,
} from 'store/auth/selectors';

const mapStateToProps = createStructuredSelector({
  isProfileLoaded: isProfileLoadedSelector,
  src: profilePropSelector(['profile', 'avatarUrl']),
});

const connectProfileImage = R.compose(
  firebaseConnect(),
  connect(mapStateToProps),
  branch(R.compose(R.not, R.prop('isProfileLoaded')), renderNothing),
  mapProps(R.pick(['size', 'src'])),
);

const ProfileImage = connectProfileImage('img');

ProfileImage.Avatar = connectProfileImage(Avatar);

export default ProfileImage;
