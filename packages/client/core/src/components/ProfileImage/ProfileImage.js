import React from 'react';
import { isNilOrEmpty } from 'ramda-adjunct';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const styles = {
  withBorder: {
    border: '1px solid rgba(255, 255, 255, 0.15)',
  },
};

const ProfileImage = ({
  src,
  alt,
  size,
  loaded,
  className,
  component: RootComponent,
  classes,
}) => {
  const componentClasses = loaded ? {} : { root: classes.withBorder };
  const withDefault = loaded && isNilOrEmpty(src);

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

export default withStyles(styles)(ProfileImage);
