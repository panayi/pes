import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { defaultProps } from 'recompose';
import Avatar from 'material-ui/Avatar';
import Face from 'material-ui-icons/Face';
import { propSelector } from 'pesposa-utils';
import withProfileData from 'components/hocs/withProfileData';

const ProfileImage = ({
  src,
  alt,
  className,
  withDefault,
  component: RootComponent,
}) => (
  <RootComponent src={src} alt={alt} className={className}>
    {withDefault && isNilOrEmpty(src) ? <Face /> : null}
  </RootComponent>
);

export default R.compose(
  defaultProps({
    component: Avatar,
  }),
  withProfileData(
    {
      src: ['image', 'downloadURL'],
    },
    propSelector('userId'),
  ),
)(ProfileImage);
