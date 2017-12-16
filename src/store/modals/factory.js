import * as R from 'ramda';
import { withProps } from 'recompose';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import * as actions from './actions';

const buttonFactory = action =>
  R.compose(
    connect(null, { onClick: action }),
    withProps(({ onClick }) => ({
      onClick: () => onClick(),
    })),
  )(Button);

// getModalId :: ModalProps -> String
const getModalId = R.path(['content', 'displayName']);

/* eslint-disable no-param-reassign */
const modalFactory = modalProps => {
  const components = R.pick(['content', 'actions'], modalProps);
  const otherProps = R.omit(['content', 'actions'], modalProps);
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
/* eslint-enable no-param-reassign */

export default modalFactory;
