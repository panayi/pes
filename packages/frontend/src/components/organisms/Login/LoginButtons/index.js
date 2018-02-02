/* @flow */
import React from 'react';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import TextDivider from 'components/atoms/TextDivider';
import LoginWithFacebook from 'components/molecules/LoginWithFacebook';
import LoginWithGoogle from 'components/molecules/LoginWithGoogle';

type Props = {
  onSuccess: Function,
  classes: Object,
};

const styles = theme => ({
  first: {
    marginTop: 3 * theme.spacing.unit,
  },
  divider: {
    marginTop: 5 * theme.spacing.unit,
    marginBottom: 2 * theme.spacing.unit,
  },
});

const LoginButtons = ({ onSuccess, classes }: Props) => [
  <Grid key="0" item xs={12} className={classes.first}>
    <LoginWithFacebook fullWidth onSuccess={onSuccess} />
  </Grid>,
  <Grid key="1" item xs={12}>
    <LoginWithGoogle fullWidth onSuccess={onSuccess} />
  </Grid>,
  <Grid key="2" item xs={12} className={classes.divider}>
    <TextDivider type="subheading" color="secondary">
      or login with your phone
    </TextDivider>
  </Grid>,
];

export default withStyles(styles)(LoginButtons);
