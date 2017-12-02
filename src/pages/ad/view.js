/* @flow */
import React from 'react';
import * as R from 'ramda';
import propsSelector from 'utils/propsSelector';
import Link from 'components/molecules/Link';
import withUserWithId from 'components/hocs/withUserWithId';

type Props = {
  adId: String, // eslint-disable-line react/no-unused-prop-types
  ad: Ad,
};

const EditAdLink = withUserWithId(
  R.compose(R.path(['ad', 'user']), propsSelector),
)(({ adId }) => <Link to={`/i/${adId}/edit`}>Edit</Link>);

const ViewAd = ({ ad, adId }: Props) => (
  <div>
    {ad.title}
    <EditAdLink ad={ad} adId={adId} />
  </div>
);

ViewAd.defaultProps = {
  ad: {},
};

export default ViewAd;
