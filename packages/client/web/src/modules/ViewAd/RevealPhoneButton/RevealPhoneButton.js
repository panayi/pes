import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { withState, withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import withStyles from '@material-ui/core/styles/withStyles';
import PhoneIcon from '@material-ui/icons/Phone';
import omitProps from '@pesposa/client-core/src/utils/omitProps';
import requirePropToRender from '@pesposa/client-core/src/hocs/requirePropToRender';
import Button from '@pesposa/client-core/src/components/Button/Button';

const styles = theme => ({
  button: {
    minWidth: 170,
    [theme.breakpoints.down(theme.map.tablet)]: {
      minWidth: 0,
    },
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
  withProps(
    createStructuredSelector({
      phone: R.path(['ad', 'sellerObject', 'phone']),
    }),
  ),
  requirePropToRender('phone'),
  withProps(({ phone, setDisplayedPhoneNumber }) => ({
    onClick: () => setDisplayedPhoneNumber(phone),
  })),
  omitProps(['ad', 'setDisplayedPhone']),
  withStyles(styles),
)(RevealPhoneButton);
