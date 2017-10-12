/* @flow */
import React from 'react';
import * as R from 'ramda';
import { Button } from 'material-ui';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withProps } from 'recompose';
import { actions, selectors, STATUS_IDLE, STATUS_SUCCEEDED, dataUrl, storageUrl } from './sync';

type Props = {
  syncAll: Function,
  status: String | null,
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
    {R.equals(props.status, STATUS_SUCCEEDED) && <span>Done!</span>}
    {R.map(([id, post]) => (
      <div key={id}>
        Synced <a href={dataUrl(`posts/${id}`)} target="_blank">post with id={id}</a>
        {
          post.syncedImagesCount
            ? <span>
              &nbsp;-&nbsp;
              <a href={storageUrl(`posts/${id}`)} target="_blank">
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
  status: selectors.statusSelector,
  posts: selectors.postsSelector,
});

const mapDispatchToProps = {
  syncAll: actions.syncAll,
};

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps(({ status }) => ({
    canSync: R.contains(status, [STATUS_IDLE, STATUS_SUCCEEDED]),
  })),
)(Sync);
