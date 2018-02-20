import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { setDisplayName } from 'recompose';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';
import Face from 'material-ui-icons/Face';
import { propSelector } from 'pesposa-utils';
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
}) => {
  const withDefault = isNilOrEmpty(src) && isLoaded.src;
  const componentClasses = isLoaded.src ? {} : { root: classes.withBorder };

  return (
    <RootComponent
      className={className}
      classes={componentClasses}
      src={src}
      alt={alt}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {withDefault ? <Face /> : null}
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
      src: ['image', 'downloadURL'],
    },
    propSelector('userId'),
  ),
  withStyles(styles),
)(ProfileImage);
