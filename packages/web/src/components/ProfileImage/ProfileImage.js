import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { setDisplayName } from 'recompose';
import Avatar from 'material-ui/Avatar';
import withStyles from 'material-ui/styles/withStyles';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import propSelector from '@pesposa/core/src/utils/propSelector';
import withProfileData from 'hocs/withProfileData';

const styles = {
  withBorder: {
    border: '1px solid rgba(255, 255, 255, 0.15)',
  },
};

const ProfileImage = ({
  src,
  isLoaded,
  alt,
  size,
  className,
  component: RootComponent,
  classes,
  userId,
}) => {
  const noUserId = R.isNil(userId);
  const loaded = isLoaded.src || noUserId;
  const withDefault = loaded && isNilOrEmpty(src);
  const componentClasses = loaded ? {} : { root: classes.withBorder };
  return (
    <RootComponent
      className={className}
      classes={componentClasses}
      src={src}
      alt={alt}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {withDefault ? (
        <AccountCircleIcon style={{ width: '100%', height: '100%' }} />
      ) : null}
    </RootComponent>
  );
};

ProfileImage.defaultProps = {
  component: Avatar,
  size: 40,
};

export default R.compose(
  setDisplayName('ProfileImage'),
  withProfileData(
    {
      src: ['avatarUrl'],
    },
    propSelector('userId'),
  ),
  withStyles(styles),
)(ProfileImage);
