import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import * as actions from './actions';
import * as selectors from './selectors';

const mapDispatchToProps = action => (dispatch, { modalProps }) =>
  bindActionCreators(
    {
      onClick: () => action(modalProps),
    },
    dispatch,
  );

const buttonFactory = (action, isIcon) =>
  connect(null, mapDispatchToProps(action))(isIcon ? IconButton : Button);

const modalFactory = id => {
  const showAction = props => dispatch =>
    dispatch(actions.showModal(id, props));
  const hideAction = () => dispatch => dispatch(actions.hideModal(id));
  const toggleAction = props => (dispatch, getState) => {
    const isOpen = selectors.isOpenSelector(getState(), { id });

    if (isOpen) {
      return dispatch(hideAction());
    }

    return dispatch(showAction(props));
  };

  const showButton = buttonFactory(showAction);
  const hideButton = buttonFactory(hideAction);
  const toggleButton = buttonFactory(toggleAction);
  const showIconButton = buttonFactory(showAction, true);
  const hideIconButton = buttonFactory(hideAction, true);
  const toggleIconButton = buttonFactory(toggleAction, true);

  return {
    showAction,
    hideAction,
    toggleAction,
    showButton,
    hideButton,
    toggleButton,
    showIconButton,
    hideIconButton,
    toggleIconButton,
  };
};

export default modalFactory;
