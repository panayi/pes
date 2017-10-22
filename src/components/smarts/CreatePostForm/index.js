/* @flow */
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import { createStructuredSelector } from 'reselect';
import { branch, renderNothing, lifecycle } from 'recompose';
import { modelConnections, connectData } from 'services/firebase';
import withAnonymousUser from 'components/hocs/withAnonymousUser';
import { uidSelector } from 'store/auth/selectors';
import PostForm from 'components/organisms/PostForm';
import {
  pendingPostImagesPathSelector,
  actions,
} from './new';

type Props = {
  onCreate: ?Function,
  firebase: Object,
  filesPath: String,
  isProfileLoaded: Boolean,
  initializeForm: Function,
  onSubmit: Function,
  onChange: Function,
};

const mapStateToProps = createStructuredSelector({
  filesPath: pendingPostImagesPathSelector,
});

const mapDispatchToProps = (dispatch: Dispatch, props: Props) => bindActionCreators({
  initializeForm: actions.initializeForm,
  onSubmit: actions.createPost(props.onCreate),
  onChange: actions.savePendingPost,
}, dispatch);

export default R.compose(
  connectData({ pendingPost: modelConnections.pendingPosts.one(uidSelector) }),
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    // Wait for `profile` to become available,
    // so that the form is properly initialized
    // when profile.pendingPost exists.
    R.compose(
      R.not,
      isLoaded,
      R.prop('pendingPost'),
    ),
    renderNothing,
  ),
  lifecycle({
    componentWillMount() {
      this.props.initializeForm(this.props.pendingPost);
    },
  }),
  withAnonymousUser,
)(PostForm);
