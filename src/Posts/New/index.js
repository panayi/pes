/* @flow */
import R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isEmpty } from 'react-redux-firebase';
import { createStructuredSelector } from 'reselect';
import { branch, renderNothing, lifecycle } from 'recompose';
import withAnonymousUser from '../../auth/withAnonymousUserHoc';
import { profileSelector } from '../../auth/auth';
import Form from '../Form';
import {
  pendingPostImagesPathSelector,
  actions,
} from './new';

type Props = {
  onCreate: ?Function,
  firebase: Object,
  filesPath: String,
  initializeForm: Function,
  onSubmit: Function,
  onChange: Function,
};

const mapStateToProps = createStructuredSelector({
  filesPath: pendingPostImagesPathSelector,
  profile: profileSelector,
});

const mapDispatchToProps = (dispatch: Dispatch, props: Props) => bindActionCreators({
  initializeForm: actions.initializeForm,
  onSubmit: actions.createPost(props.onCreate),
  onChange: actions.savePendingPost,
}, dispatch);

export default R.compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    // Wait for `profile` to become available,
    // so that the form is properly initialized
    // when profile.pendingPost exists.
    R.compose(
      isEmpty,
      R.prop('profile'),
    ),
    renderNothing,
  ),
  lifecycle({
    componentWillMount() {
      this.props.initializeForm();
    },
  }),
  withAnonymousUser,
)(Form);
