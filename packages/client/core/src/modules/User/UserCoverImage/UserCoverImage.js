import React from 'react';
import * as R from 'ramda';
import defaultTheme from '../../../config/theme';
import Imgix from '../../../components/Imgix/Imgix';
import UserAvatar from '../UserAvatar/UserAvatar';

const IMGIX_PARAMS = {
  w: 900,
  h: 300,
  auto: 'compress',
  blend: defaultTheme.palette.primary.light,
  balph: 100,
  bm: 'multiply',
  colorquant: 3,
  fit: 'crop',
  crop: 'faces,edges',
  blur: 30,
};

const UserCoverImage = ({ userId, userType, children }) => {
  if (R.isNil(userId)) {
    return children({});
  }

  return (
    <UserAvatar userId={userId} userType={userType}>
      {({ avatar }) => (
        <Imgix params={IMGIX_PARAMS} image={avatar}>
          {children}
        </Imgix>
      )}
    </UserAvatar>
  );
};

export default UserCoverImage;
