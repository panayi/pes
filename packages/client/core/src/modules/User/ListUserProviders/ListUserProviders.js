import React, { Component } from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { defaultProps, withProps } from 'recompose';
import withStyles from '@material-ui/core/styles/withStyles';
import * as firebaseConfig from '@pesposa/core/src/config/firebase';
import propSelector from '@pesposa/core/src/utils/propSelector';
import authConfig from '../../../config/auth';
import { actions as authActions } from '../../../store/firebase/auth';
import { actions as modalActions } from '../../../store/modals';
import withProfileData from '../withProfileData';
import ReduxModal from '../../../components/Modal/ReduxModal/ReduxModal';
import ErrorModal from '../../../components/ErrorModal/ErrorModal';
import ProviderIcon from './ProviderIcon/ProviderIcon';

// type Props = {
//   canLink: ?boolean,
//   providerComponent: React$Node,
//   className: string | null,
//   providers: Array<Object>,
//   linkProvider: Function,
//   classes: Object,
// };

const styles = {
  clickable: {
    cursor: 'pointer',
  },
};

class ListUserProviders extends Component {
  canLinkProvider = provider => {
    const { canLink } = this.props;
    return canLink && provider && provider.disabled;
  };

  handleProviderClick = async provider => {
    const { linkProvider, openModal } = this.props;

    if (!this.canLinkProvider(provider)) {
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
      const accountExists = R.contains(code, [
        'auth/email-already-in-use',
        'auth/credential-already-in-use',
      ]);
      const title = `Cannot link your ${providerName} profile`;
      const errorMsg = accountExists
        ? `Your ${providerName} profile is already associated with a different Pesposa account. Linking existing Pesposa accounts is not supported.`
        : null;
      openModal('error', { title, errorMsg });
    }
  };

  renderProvider = provider => {
    const { providerComponent: Provider, classes } = this.props;

    return (
      <Provider
        className={classNames({
          [classes.clickable]: this.canLinkProvider(provider),
        })}
        key={provider.providerId}
        onClick={() => this.handleProviderClick(provider)}
        {...provider}
      />
    );
  };

  render() {
    const { prefix, className, providers } = this.props;

    return (
      <React.Fragment>
        {providers.length ? prefix : null}
        <div className={className}>{R.map(this.renderProvider, providers)}</div>
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
  connect(
    null,
    mapDispatchToProps,
  ),
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
)(ListUserProviders);
