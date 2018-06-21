import React from 'react';
import * as R from 'ramda';
import ProfileImage from '../../../components/ProfileImage/ProfileImage';
import UserAvatar from '../UserAvatar/UserAvatar';

const UserImage = ({ src, isLoaded, userId, userType, ...rest }) => {
  if (R.isNil(userId)) {
    return <ProfileImage loaded {...rest} />;
  }

  return (
    <UserAvatar userId={userId} userType={userType}>
      {({ avatar, loaded }) => (
        <ProfileImage
          src={avatar.originalUrl || avatar.downloadURL}
          loaded={loaded}
          {...rest}
        />
      )}
    </UserAvatar>
  );
};

export default UserImage;
