import R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { defaultProps } from 'recompose';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { usersSelector } from './users';

const mapStateToProps = createStructuredSelector({
  users: usersSelector,
});

export default R.compose(
  firebaseConnect([
    'users',
  ]),
  connect(mapStateToProps),
  defaultProps({
    users: [],
  }),
);
