import R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { mapProps, branch, renderNothing } from 'recompose';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Text } from 'rebass';
import { isProfileLoadedSelector, profilePropSelector } from '../../auth';

const mapStateToProps = createStructuredSelector({
  isProfileLoaded: isProfileLoadedSelector,
  children: profilePropSelector('displayName'),
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
)(Text);
