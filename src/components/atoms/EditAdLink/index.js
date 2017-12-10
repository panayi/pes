import React from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import propsSelector from 'utils/propsSelector';
import requirePropToRender from 'components/hocs/requirePropToRender';
import withUserWithId from 'components/hocs/withUserWithId';
import Link from 'components/molecules/Link';

const EditAdLink = ({ adId }) => <Link to={`/i/${adId}/edit`}>Edit</Link>;

export default R.compose(
  requirePropToRender('ad'),
  withUserWithId(R.compose(R.path(['ad', 'user']), propsSelector)),
  withProps(({ ad }) => ({
    adId: ad.id,
  })),
)(EditAdLink);
