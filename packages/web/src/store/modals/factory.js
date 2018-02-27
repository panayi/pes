import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import * as actions from './actions';

const mapDispatchToProps = action => (dispatch, { modalProps }) =>
  bindActionCreators(
    {
      onClick: () => action(modalProps),
    },
    dispatch,
  );

const buttonFactory = action =>
  R.compose(connect(null, mapDispatchToProps(action)))(Button);

const modalFactory = id => {
  const showAction = props => dispatch =>
    dispatch(actions.showModal(id, props));
  const hideAction = () => dispatch => dispatch(actions.hideModal(id));

  const showButton = buttonFactory(showAction);
  const hideButton = buttonFactory(hideAction);

  return {
    showAction,
    hideAction,
    showButton,
    hideButton,
  };
};

export default modalFactory;
