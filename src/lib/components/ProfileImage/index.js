import R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { defaultProps, mapProps, branch, renderNothing } from 'recompose';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Avatar } from 'rebass';
import { profileImageSelector } from '../../../Auth/auth';

const mapStateToProps = createStructuredSelector({
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
      R.isNil,
      R.prop('src'),
    ),
    renderNothing,
  ),
  mapProps(R.pick(['size', 'src'])),
)(Avatar);
