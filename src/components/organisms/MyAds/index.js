/* @flow */
import React from 'react';
import * as R from 'ramda';
import { connectData } from 'lib/connectData';
import { models } from 'store/data';
import AdsList from 'components/organisms/AdsList';

type Props = {
  myAds: Array<Object>,
};

const MyAds = ({ myAds }: Props) => (
  <AdsList hits={myAds} hasMore={false} loadMore={() => {}} sidebarWidth={0} />
);

const mapDataToProps = {
  myAds: models.myAds.all,
};

export default R.compose(connectData(mapDataToProps))(MyAds);
