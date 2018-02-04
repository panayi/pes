import * as R from 'ramda';
import { withProps } from 'recompose';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import * as actions from './actions';

const componentsPropKeys = ['content', 'actions', 'modal'];

const buttonFactory = action =>
  R.compose(
    connect(null, { onClick: action }),
    withProps(({ onClick }) => ({
      onClick: () => onClick(),
    })),
  )(Button);

// getModalId :: ModalProps -> String
const getModalId = R.path(['content', 'displayName']);

const modalFactory = modalProps => {
  const components = R.pick(componentsPropKeys, modalProps);
  const otherProps = R.omit(componentsPropKeys, modalProps);
  const id = getModalId(modalProps);

  const showAction = props => dispatch => {
    const finalProps = R.merge(otherProps, props);
    return dispatch(actions.showModal(id, components, finalProps));
  };
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