/* @flow */
import React from 'react';
import * as R from 'ramda';
import { Button } from 'material-ui';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withProps } from 'recompose';
import { getDataUrl, getStorageUrl } from 'services/firebase/urls';
import { actions, selectors } from 'store/admin/sync';

type Props = {
  syncAll: Function,
  isStatusIdle: Boolean | null, // eslint-disable-line react/no-unused-prop-types
  isStatusSucceeded: Boolean | null,
  posts: Object,
  canSync: Boolean
};

const Sync = (props: Props) => (
  <div>
    <Button
      color="primary"
      raised
      onClick={() => props.syncAll()}
      disabled={!props.canSync}
    >
      Sync all data
    </Button>
    {props.isStatusSucceeded && <span>Done!</span>}
    {R.map(([id, post]) => (
      <div key={id}>
        Synced <a href={getDataUrl(`posts/${id}`)} target="_blank">post with id={id}</a>
        {
          post.syncedImagesCount
            ? <span>
              &nbsp;-&nbsp;
              <a href={getStorageUrl(`posts/${id}`)} target="_blank">
                {post.syncedImagesCount} images
              </a>
            </span>
            : null
        }
      </div>
    ), R.toPairs(props.posts))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  isStatusIdle: selectors.isStatusIdleSelector,
  isStatusSucceeded: selectors.isStatusSucceededSelector,
  posts: selectors.postsSelector,
});

const mapDispatchToProps = {
  syncAll: actions.syncAll,
};

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps(({ isStatusIdle, isStatusSucceeded }) => ({
    canSync: isStatusIdle || isStatusSucceeded,
  })),
)(Sync);
