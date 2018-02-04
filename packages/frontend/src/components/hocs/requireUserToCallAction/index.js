import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { mapProps } from 'recompose';
import { selectors as authSelectors } from 'store/firebase/auth';
import Login from 'components/organisms/Login';

const mapStateToProps = createStructuredSelector({
  isAuthenticated: authSelectors.isAuthenticatedSelector,
});

const mapDispatchToProps = {
  showLoginModal: Login.showAction,
};

const requiresUserToCallAction = actionKey =>
  R.compose(
    connect(mapStateToProps, mapDispatchToProps),
    mapProps(({ isAuthenticated, showLoginModal, ...props }) => ({
      ...props,
      [actionKey]: (...args) => {
        if (isAuthenticated) {
          return props[actionKey](...args);
        }

        return showLoginModal({
          onSuccess: () => {
            props[actionKey](...args);
          },
        });
      },
    })),
  );

export default requiresUserToCallAction;
