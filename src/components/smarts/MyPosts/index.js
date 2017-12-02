/* @flow */
import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { createStructuredSelector } from 'reselect';
import { uidSelector } from 'store/auth/selectors';
import PostsList from 'components/organisms/PostsList';

type Props = {
  hits: Array<Object>,
};

const MyPosts = ({ hits }: Props) => (
  <PostsList hits={hits} hasMore={false} loadMore={() => {}} sidebarWidth={0} />
);

const mapStateToProps = createStructuredSelector({
  uid: uidSelector,
});

export default R.compose(
  connect(mapStateToProps),
  firebaseConnect(
    ({ uid }) => (uid ? [`posts#orderByChild=user&equalTo=${uid}`] : []),
  ),
  connect((state, { uid }) => ({
    hits: R.compose(
      R.map(([objectID, value]) => ({ objectID, ...value })),
      R.toPairs,
      R.filter(R.propEq('user', uid)),
      R.pathOr([], ['firebase', 'data', 'posts']),
    )(state),
  })),
)(MyPosts);
