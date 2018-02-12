import React from 'react';
import * as R from 'ramda';
import { withState, withProps } from 'recompose';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import PhoneIcon from 'material-ui-icons/Phone';
import omitProps from 'utils/omitProps';

const styles = theme => ({
  button: {
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: 170,
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
});

const RevealPhoneButton = ({ ad, children, phone, classes, ...rest }) => (
  <Button
    href={phone ? `tel:${phone}` : null}
    component="a"
    className={classes.button}
    color="primary"
    variant="raised"
    {...rest}
  >
    <PhoneIcon className={classes.icon} />
    {phone || children}
  </Button>
);

export default R.compose(
  withState('phone', 'setPhone', null),
  withProps(({ ad, setPhone }) => ({
    onClick: () => setPhone(ad.phone),
  })),
  omitProps(['ad', 'setPhone']),
  withStyles(styles),
)(RevealPhoneButton);
