import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { withState, withProps, branch } from 'recompose';
import { createStructuredSelector } from 'reselect';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import PhoneIcon from 'material-ui-icons/Phone';
import propSelector from '@pesposa/core/src/utils/propSelector';
import omitProps from 'utils/omitProps';
import withProfileData from 'hocs/withProfileData';

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
  displayedPhone,
  onClick,
  classes,
  ...rest
}) => (
  <Komponent
    href={displayedPhone ? `tel:${displayedPhone}` : null}
    onClick={onClick}
    component="a"
    className={classNames(classes.button, className)}
    color="primary"
    variant="raised"
    {...rest}
  >
    <PhoneIcon className={classes.icon} />
    {displayedPhone || children}
  </Komponent>
);

RevealPhoneButton.defaultProps = {
  component: Button,
};

export default R.compose(
  withState('displayedPhone', 'setDisplayedPhone', null),
  branch(
    R.path(['ad', 'user']),
    withProfileData(
      {
        phone: ['phoneNumber'],
      },
      propSelector(['ad', 'user']),
    ),
    withProps(
      createStructuredSelector({
        phone: R.path(['ad', 'phoneNumber']),
      }),
    ),
  ),
  withProps(({ phone, setDisplayedPhone }) => ({
    onClick: () => setDisplayedPhone(phone),
  })),
  omitProps(['ad', 'setDisplayedPhone']),
  withStyles(styles),
)(RevealPhoneButton);
