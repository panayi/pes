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
import withProfileData from 'hocs/withProfileData';
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
  ad,
  component: Komponent,
  className,
  children,
  displayedPhoneNumber,
  onClick,
  classes,
  ...rest
}) => (
  <Komponent
    href={displayedPhoneNumber ? `tel:${displayedPhoneNumber}` : null}
    onClick={onClick}
    component="a"
    className={classNames(classes.button, className)}
    {...rest}
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
    withProfileData(
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
