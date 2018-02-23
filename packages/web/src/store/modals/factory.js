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
