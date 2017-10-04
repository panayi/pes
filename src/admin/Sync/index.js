/* @flow */
import React from 'react';
import R from 'ramda';
import { Flex, Box, Button } from 'rebass';
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
      onClick={() => props.syncAll()}
      disabled={!props.canSync}
    >
      Sync all data
    </Button>
    {R.equals(props.status, STATUS_SUCCEEDED) && <span>Done!</span>}
    <Flex column>
      {R.map(([id, post]) => (
        <Box key={id}>
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
        </Box>
      ), R.toPairs(props.posts))}
    </Flex>
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
