import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { mapProps, branch, renderNothing } from 'recompose';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Typography } from 'material-ui';
import { isProfileLoadedSelector, profilePropSelector } from 'store/auth/selectors';

const mapStateToProps = createStructuredSelector({
  isProfileLoaded: isProfileLoadedSelector,
  children: profilePropSelector(['profile', 'displayName']),
});

export default R.compose(
  firebaseConnect(),
  connect(mapStateToProps),
  branch(
    R.compose(
      R.not,
      R.prop('isProfileLoaded'),
    ),
    renderNothing,
  ),
  mapProps(R.omit(['isProfileLoaded'])),
)(Typography);