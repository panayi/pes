import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { mapProps } from 'recompose';
import { selectors as authSelectors } from 'store/auth';
import LoginModal from 'components/organisms/LoginModal';

const mapStateToProps = createStructuredSelector({
  isAuthenticated: authSelectors.isAuthenticatedSelector,
});

const mapDispatchToProps = {
  showLoginModal: LoginModal.showAction,
};

export default actionKey =>
  R.compose(
    connect(mapStateToProps, mapDispatchToProps),
    mapProps(({ isAuthenticated, showLoginModal, ...props }) => ({
      ...props,
      [actionKey]: (...args) => {
        if (isAuthenticated) {
          return props[actionKey](...args);
        }

        return showLoginModal({
          onSuccess: () => props[actionKey](...args),
        });
      },
    })),
  );
