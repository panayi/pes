/* @flow */
import React from 'react';
import * as R from 'ramda';
import { defaultProps, withProps } from 'recompose';
import { auth as authConfig } from 'pesposa-config';
import { propSelector } from 'pesposa-core/utils';
import withProfileData from 'components/hocs/withProfileData';
import ProviderIcon from 'components/atoms/ProviderIcon';

type Props = {
  providerComponent: React$Node,
  className: String | null,
  providers: Array<Object>,
};

const UserProviders = ({
  providerComponent: Provider,
  className,
  providers,
}: Props) => (
  <div className={className}>
    {R.map(provider => <Provider {...provider} />, providers)}
  </div>
);

export default R.compose(
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
  withProps(({ providerIds }) => ({
    providers: R.map(
      providerId => ({
        providerId,
        disabled: R.complement(R.contains(providerId), providerIds),
      }),
      authConfig.providers,
    ),
  })),
)(UserProviders);
