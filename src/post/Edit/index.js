/* @flow */
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { isLoaded } from 'react-redux-firebase';
import { withProps, lifecycle, branch, renderNothing } from 'recompose';
import { modelConnections, connectData } from '../../firebase';
import needsUserWithId from '../../auth/visibility/needsUserWithId';
import propsSelector from '../../lib/selectors/props';
import Form from '../Form';
import { postIdSelector, postImagesPathSelector, actions } from './edit';

type Props = {
  onSave: ?Function,
  firebase: Object,
  filesPath: String,
  postId: string,
  initializeForm: Function,
  onSubmit: Function,
};

const mapDispatchToProps = (dispatch: Dispatch, props: Props) => bindActionCreators({
  initializeForm: actions.initializeForm,
  onSubmit: actions.savePost(props.postId, props.onSave),
}, dispatch);

export default R.compose(
  withProps(createStructuredSelector({
    postId: postIdSelector,
    filesPath: postImagesPathSelector,
  })),
  connectData({
    post: modelConnections.posts.one((state, props) => props.postId),
  }, null, mapDispatchToProps),
  branch(
    // Wait for `post` to become available,
    // so that the form is properly initialized.
    R.compose(
      R.not,
      isLoaded,
      R.prop('post'),
    ),
    renderNothing,
  ),
  needsUserWithId(R.compose(
    R.path(['post', 'user']),
    propsSelector,
  )),
  lifecycle({
    componentWillMount() {
      this.props.initializeForm(this.props.post);
    },
  }),
  // TODO: need a `withUser(post.user)` to make sure the post belongs to the logged-in user
)(Form);
