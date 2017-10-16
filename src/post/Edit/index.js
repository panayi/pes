/* @flow */
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withProps, lifecycle } from 'recompose';
import Form from '../Form';
import { postImagesPathSelector, actions } from './edit';

type Props = {
  onSave: ?Function,
  firebase: Object,
  filesPath: String,
  postId: string,
  post: Post,
  initializeForm: Function,
  onSubmit: Function,
};

const mapDispatchToProps = (dispatch: Dispatch, props: Props) => bindActionCreators({
  initializeForm: actions.initializeForm,
  onSubmit: actions.savePost(props.postId, props.onSave),
}, dispatch);

export default R.compose(
  withProps(createStructuredSelector({
    filesPath: postImagesPathSelector,
  })),
  connect(null, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.initializeForm(this.props.post);
    },
  }),
  // TODO: need a `withUser(post.user)` to make sure the post belongs to the logged-in user
)(Form);
