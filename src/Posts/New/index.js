/* @flow */
import R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { createStructuredSelector } from 'reselect';
import { lifecycle } from 'recompose';
import withAnonymousUser from '../../Auth/withAnonymousUserHoc';
import { profileSelector } from '../../Auth/auth';
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
  lifecycle({
    componentWillMount() {
      this.props.initializeForm();
    },
    componentWillReceiveProps(nextProps) {
      nextProps.initializeForm();
    },
  }),
  withAnonymousUser,
)(Form);
