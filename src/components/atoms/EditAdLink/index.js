/* @flow */
import React from 'react';
import * as R from 'ramda';
import propsSelector from 'utils/propsSelector';
import requirePropToRender from 'components/hocs/requirePropToRender';
import withUserWithId from 'components/hocs/withUserWithId';
import Link from 'components/molecules/Link';

type Props = {
  ad: Ad,
  adId: string,
  children: React$Node,
};

const EditAdLink = ({ adId, children, ...rest }: Props) => (
  <Link.icon {...rest} to={`/i/${adId}/edit`}>
    {children}
  </Link.icon>
);

export default R.compose(
  requirePropToRender('ad'),
  withUserWithId(R.compose(R.path(['ad', 'user']), propsSelector)),
)(EditAdLink);
