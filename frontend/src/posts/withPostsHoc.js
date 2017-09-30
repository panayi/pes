import R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { defaultProps } from 'recompose';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { postsSelector } from './posts';

const mapStateToProps = createStructuredSelector({
  posts: postsSelector,
});

export default R.compose(
  firebaseConnect([
    'posts',
  ]),
  connect(mapStateToProps),
  defaultProps({
    posts: [],
  }),
);
