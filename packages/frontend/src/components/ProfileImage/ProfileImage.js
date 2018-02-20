import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { defaultProps, withProps, setDisplayName } from 'recompose';
import Avatar from 'material-ui/Avatar';
import Face from 'material-ui-icons/Face';
import { propSelector } from 'pesposa-utils';
import withProfileData from 'hocs/withProfileData';

const ProfileImage = ({
  src,
  alt,
  style,
  className,
  withDefault,
  component: RootComponent,
}) => (
  <RootComponent src={src} alt={alt} style={style} className={className}>
    {withDefault && isNilOrEmpty(src) ? <Face /> : null}
  </RootComponent>
);

export default R.compose(
  setDisplayName('ProfileImage'),
  defaultProps({
    component: Avatar,
    size: 40,
  }),
  withProps(({ size }) => ({
    style: {
      width: `${size}px`,
      height: `${size}px`,
    },
  })),
  withProfileData(
    {
      src: ['image', 'downloadURL'],
    },
    propSelector('userId'),
  ),
)(ProfileImage);
