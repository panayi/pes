/* @flow */
import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { withProps } from 'recompose';
import createCachedSelector from 're-reselect';
import Avatar from 'material-ui/Avatar';
import green from 'material-ui/colors/green';
import { withStyles } from 'material-ui/styles';
import CheckIcon from 'material-ui-icons/Check';
import { firebase as firebaseConstants } from 'pesposa-core/constants';
import { propSelector } from 'pesposa-core/utils';
import FacebookAvatar from 'components/atoms/FacebookAvatar';
import GoogleAvatar from 'components/atoms/GoogleAvatar';
import PhoneAvatar from 'components/atoms/PhoneAvatar';

type Props = {
  providerId: String, // eslint-disable-line react/no-unused-prop-types
  disabled: Boolean,
  icon: React$Node | null,
  iconProps: Object | null,
  onClick: Function | null,
  title: String | null,
  className: String | null,
  classes: Object,
};

const styles = theme => ({
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 30,
    height: 30,
  },
  disabled: {
    opacity: 0.6,
    filter: 'grayscale(1)',
  },
  phoneIcon: {
    width: 20,
    height: 20,
  },
  checkAvatar: {
    position: 'absolute',
    bottom: -2,
    right: -4,
    width: 13,
    height: 13,
    color: theme.palette.common.black,
    background: theme.palette.background.chip,
  },
  checkIcon: {
    width: 9,
    height: 9,
    color: green[800],
  },
});

const CheckAvatar = withStyles(styles)(({ classes }) => (
  <Avatar className={classes.checkAvatar}>
    <CheckIcon className={classes.checkIcon} />
  </Avatar>
));

const ProviderIcon = ({
  disabled,
  icon: Icon,
  iconProps,
  onClick,
  title,
  className,
  classes,
}: Props) => {
  if (!Icon) {
    return null;
  }

  return (
    <div className={classNames(classes.avatarWrap, className)} title={title}>
      <Icon
        className={classNames(classes.avatar, { [classes.disabled]: disabled })}
        onClick={onClick}
        iconProps={iconProps}
      />
      {!disabled && <CheckAvatar />}
    </div>
  );
};

const providerPropsSelector = createCachedSelector(
  propSelector('providerId'),
  propSelector('disabled'),
  propSelector('classes'),
  (providerId, disabled, classes) => {
    if (providerId === firebaseConstants.PROVIDER_IDS.facebook) {
      return {
        icon: FacebookAvatar,
        title: disabled ? null : 'Verified with Facebook',
      };
    }

    if (providerId === firebaseConstants.PROVIDER_IDS.google) {
      return {
        icon: GoogleAvatar,
        iconProps: {
          width: 20,
          height: 20,
        },
        title: disabled ? null : 'Verified with Google',
      };
    }

    if (providerId === firebaseConstants.PROVIDER_IDS.phone) {
      return {
        icon: PhoneAvatar,
        iconProps: {
          className: classes.phoneIcon,
        },
        title: disabled ? null : 'Verified phone number',
      };
    }

    return {};
  },
)(propSelector('providerId'));

export default R.compose(withStyles(styles), withProps(providerPropsSelector))(
  ProviderIcon,
);
