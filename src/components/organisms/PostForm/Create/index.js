/* @flow */
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import { createStructuredSelector } from 'reselect';
import { branch, renderNothing, lifecycle } from 'recompose';
import { modelConnections, connectData } from 'services/connectData';
import withAnonymousUser from 'components/hocs/withAnonymousUser';
import { uidSelector } from 'store/auth/selectors';
import { actions, selectors } from 'store/post';
import PostForm from '../Form';

type Props = {
  onCreate: ?Function,
  firebase: Object,
  filesPath: String,
  post: Post,
  isProfileLoaded: Boolean,
  initializeForm: Function,
  onSubmit: Function,
  onChange: Function,
};

const mapStateToProps = createStructuredSelector({
  filesPath: selectors.pendingPostImagesPathSelector,
});

const mapDispatchToProps = (dispatch: Dispatch, props: Props) => bindActionCreators({
  initializeForm: actions.initializeForm,
  onSubmit: actions.createPost(props.onCreate),
  onChange: actions.savePendingPost,
}, dispatch);

export default R.compose(
  withAnonymousUser,
  connectData({ post: modelConnections.pendingPosts.one(uidSelector) }),
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    // Wait for `profile` to become available,
    // so that the form is properly initialized
    // when profile.pendingPost exists.
    R.compose(
      R.not,
      isLoaded,
      R.prop('post'),
    ),
    renderNothing,
  ),
  lifecycle({
    componentWillMount() {
      this.props.initializeForm(this.props.post);
    },
  }),
)(PostForm);
