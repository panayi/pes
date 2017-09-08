/* @flow */
import R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { createStructuredSelector } from 'reselect';
import { lifecycle } from 'recompose';
import needsAnonymousUser from '../../Auth/needsAnonymousUserHoc';
import Form from '../Form';
import type { Props } from './types';
import {
  pendingPostSelector,
  pendingPostPathSelector,
  pendingPostImagesPathSelector,
  actions,
} from './new';

const mapStateToProps = createStructuredSelector({
  pendingPostPath: pendingPostPathSelector,
  filesPath: pendingPostImagesPathSelector,
  pendingPost: pendingPostSelector,
});

const mapDispatchToProps = (dispatch: Dispatch, props: Props) => bindActionCreators({
  initializeForm: actions.initializeForm,
  onSubmit: actions.createPost(props.onCreate),
  onChange: actions.savePendingPost,
}, dispatch);

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect(props => (
    props.pendingPostPath ? [props.pendingPostPath] : null
  )),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      nextProps.initializeForm(nextProps);
    },
  }),
  needsAnonymousUser,
)(Form);
