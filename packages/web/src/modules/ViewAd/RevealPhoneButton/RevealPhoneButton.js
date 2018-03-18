import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { withState, withProps, branch } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { withStyles } from 'material-ui/styles';
import PhoneIcon from 'material-ui-icons/Phone';
import propSelector from '@pesposa/core/src/utils/propSelector';
import omitProps from 'utils/omitProps';
import requirePropToRender from 'hocs/requirePropToRender';
import { withUserProfileData } from 'hocs/withProfileData';
import Button from 'components/Button/Button';

const styles = theme => ({
  button: {
    minWidth: 170,
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
});

const RevealPhoneButton = ({
  component: Komponent,
  className,
  buttonProps,
  children,
  displayedPhoneNumber,
  onClick,
  classes,
}) => (
  <Komponent
    href={displayedPhoneNumber ? `tel:${displayedPhoneNumber}` : null}
    onClick={onClick}
    component="a"
    className={classNames(classes.button, className)}
    {...buttonProps}
  >
    <PhoneIcon className={classes.icon} />
    {displayedPhoneNumber || children}
  </Komponent>
);

RevealPhoneButton.defaultProps = {
  component: Button,
};

export default R.compose(
  withState('displayedPhoneNumber', 'setDisplayedPhoneNumber', null),
  branch(
    R.path(['ad', 'user']),
    withUserProfileData(
      {
        phoneNumber: ['phoneNumber'],
      },
      propSelector(['ad', 'user']),
    ),
    withProps(
      createStructuredSelector({
        phoneNumber: R.path(['ad', 'phone']),
      }),
    ),
  ),
  requirePropToRender('phoneNumber'),
  withProps(({ phoneNumber, setDisplayedPhoneNumber }) => ({
    onClick: () => setDisplayedPhoneNumber(phoneNumber),
  })),
  omitProps(['ad', 'setDisplayedPhone']),
  withStyles(styles),
)(RevealPhoneButton);
