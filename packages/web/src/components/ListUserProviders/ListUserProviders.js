/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { defaultProps, withProps } from 'recompose';
import withStyles from 'material-ui/styles/withStyles';
import * as firebaseConfig from '@pesposa/core/src/config/firebase';
import authConfig from '@pesposa/core/src/config/auth';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { actions as authActions } from 'store/firebase/auth';
import { actions as modalActions } from 'store/modals';
import withProfileData from 'hocs/withProfileData';
import ReduxModal from 'components/Modal/ReduxModal/ReduxModal';
import ErrorModal from 'components/ErrorModal/ErrorModal';
import ProviderIcon from 'components/ProviderIcon/ProviderIcon';

type Props = {
  link: ?boolean,
  providerComponent: React$Node,
  className: string | null,
  providers: Array<Object>,
  linkProvider: Function,
  classes: Object,
};

const styles = {
  clickable: {
    cursor: 'pointer',
  },
};

class UserProviders extends Component<Props> {
  handleProviderClick = async provider => {
    const { link, linkProvider } = this.props;

    if (!link) {
      return;
    }

    const { providerId } = provider;

    try {
      await linkProvider(providerId);
    } catch (error) {
      const code = R.prop('code', error);
      const providerName =
        providerId === firebaseConfig.PROVIDER_IDS.facebook
          ? 'Facebook'
          : 'Google';
      const accountExists = code === 'auth/email-already-in-use';
      const title = `Cannot link your ${providerName} profile`;
      const errorMsg = accountExists
        ? `Your ${providerName} profile is already associated with a different Pesposa account. Linking multiple Pesposa accounts is not supported.`
        : null;
      this.props.openModal('error', { title, errorMsg });
    }
  };

  render() {
    const {
      providerComponent: Provider,
      prefix,
      className,
      providers,
      link,
      classes,
    } = this.props;

    return (
      <React.Fragment>
        {providers.length ? prefix : null}
        <div className={classNames({ [classes.clickable]: link }, className)}>
          {R.map(
            provider => (
              <Provider
                key={provider.providerId}
                onClick={() => this.handleProviderClick(provider)}
                {...provider}
              />
            ),
            providers,
          )}
        </div>
        <ReduxModal id="error" content={ErrorModal} />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  linkProvider: authActions.linkProvider,
  openModal: modalActions.openModal,
};

export default R.compose(
  connect(null, mapDispatchToProps),
  withProfileData(
    {
      providerIds: ['providerIds'],
    },
    propSelector('userId'),
  ),
  defaultProps({
    providerComponent: ProviderIcon,
    providerIds: [],
  }),
  withProps(({ providerIds, hideDisabled }) => ({
    providers: R.compose(
      R.when(R.always(hideDisabled), R.reject(R.prop('disabled'))),
      R.map(providerId => ({
        providerId,
        disabled: R.complement(R.contains(providerId))(providerIds || []),
      })),
    )(authConfig.providers),
  })),
  withStyles(styles),
)(UserProviders);
