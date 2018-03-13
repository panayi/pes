import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { mapProps } from 'recompose';
import { selectors as authSelectors } from 'store/firebase/auth';
import { actions as modalActions } from 'store/modals';

const mapStateToProps = createStructuredSelector({
  isAuthenticated: authSelectors.isAuthenticatedSelector,
});

const mapDispatchToProps = {
  openModal: modalActions.openModal,
};

const requireUserToCallAction = actionKey =>
  R.compose(
    connect(mapStateToProps, mapDispatchToProps),
    mapProps(({ isAuthenticated, openModal, ...props }) => ({
      ...props,
      [actionKey]: (...args) => {
        if (isAuthenticated) {
          return props[actionKey](...args);
        }

        return new Promise(resolve =>
          openModal('login', {
            onSuccess: async () => {
              const result = await props[actionKey](...args);
              resolve(result);
            },
          }),
        );
      },
    })),
  );

export default requireUserToCallAction;
