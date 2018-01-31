/* @flow */
import React from 'react';
import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { defaultProps } from 'recompose';
import { connect } from 'react-redux';
import authConfig from 'config/auth';
import { actions as authActions } from 'store/firebase/auth';
import {
  actions as linkedProvidersActions,
  selectors as linkedProvidersSelectors,
} from 'store/linkedProviders';
import { selectors as profileSelectors } from 'store/firebase/profile';
import onceWhen from 'components/hocs/onceWhen';
import ProviderIcon from 'components/atoms/ProviderIcon';
import LinkProvider from './LinkProvider';

type Props = {
  providerComponent: React$Node,
  className: string | null,
  linkedProviders: Array<String>,
  fetchLinkedProviders: Function,
  linkProvider: Function,
};

class LinkProviders extends React.Component<Props> {
  handleProviderClick = async providerId => {
    try {
      const { linkProvider, fetchLinkedProviders } = this.props;
      await linkProvider(providerId);
      fetchLinkedProviders();
    } catch (error) {
      alert(error); // eslint-disable-line no-alert
    }
  };

  render() {
    const { providerComponent, className, linkedProviders } = this.props;

    return (
      <div className={className}>
        {R.map(
          providerId => (
            <LinkProvider
              key={providerId}
              providerId={providerId}
              linkedProviders={linkedProviders}
              onClick={() => this.handleProviderClick(providerId)}
              component={providerComponent}
            />
          ),
          authConfig.providers,
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isProfileLoaded: profileSelectors.isProfileLoadedSelector,
  linkedProviders: linkedProvidersSelectors.linkedProvidersSelector,
});

const mapDispatchToProps = {
  fetchLinkedProviders: linkedProvidersActions.fetchLinkedProviders,
  linkProvider: authActions.linkProvider,
};

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  onceWhen(props => props.fetchLinkedProviders(), R.prop('isProfileLoaded')),
  defaultProps({
    providerComponent: ProviderIcon,
  }),
)(LinkProviders);
