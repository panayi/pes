import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { defaultProps, mapProps, branch, renderNothing } from 'recompose';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Image, Avatar } from 'rebass';
import { isProfileLoadedSelector, profilePropSelector } from '../../auth';

const mapStateToProps = createStructuredSelector({
  isProfileLoaded: isProfileLoadedSelector,
  src: profilePropSelector('avatarUrl'),
});

const connectProfileImage = R.compose(
  firebaseConnect(),
  connect(mapStateToProps),
  defaultProps({
    size: 32,
  }),
  branch(
    R.compose(
      R.not,
      R.prop('isProfileLoaded'),
    ),
    renderNothing,
  ),
  mapProps(R.pick(['size', 'src'])),
);

const ProfileImage = connectProfileImage(Image);

ProfileImage.Avatar = connectProfileImage(Avatar);

export default ProfileImage;
