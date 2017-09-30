import R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { defaultProps, mapProps, branch, renderNothing } from 'recompose';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Avatar } from 'rebass';
import { isProfileLoadedSelector, profileImageSelector } from '../../../auth/auth';

const mapStateToProps = createStructuredSelector({
  isProfileLoaded: isProfileLoadedSelector,
  src: profileImageSelector,
});

export default R.compose(
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
)(Avatar);
