import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { mapProps } from 'recompose';
import { selectors as authSelectors } from 'store/firebase/auth';
import { modals } from 'store/modals';

const mapStateToProps = createStructuredSelector({
  isAuthenticated: authSelectors.isAuthenticatedSelector,
});

const mapDispatchToProps = {
  showLoginModal: modals.login.showAction,
};

const requireUserToCallAction = actionKey =>
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

export default requireUserToCallAction;
