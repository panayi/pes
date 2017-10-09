/* @flow */
import R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { createStructuredSelector } from 'reselect';
import { branch, renderNothing, lifecycle } from 'recompose';
import withAnonymousUser from '../../auth/Login/withAnonymousUser';
import { isProfileLoadedSelector } from '../../auth/auth';
import Form from '../Form';
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
  isProfileLoaded: isProfileLoadedSelector,
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
      R.not,
      R.prop('isProfileLoaded'),
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
