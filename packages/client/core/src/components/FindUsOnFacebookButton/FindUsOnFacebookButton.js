import React from 'react';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import * as pesposaConfig from '@pesposa/core/src/config/pesposa';
import * as colors from '@pesposa/core/src/config/colors';
import Button from '../Button/Button';
import FindUsOnFacebookIcon from './FindUsOnFacebookIcon/FindUsOnFacebookIcon';

const styles = {
  root: {
    color: '#fff',
    backgroundColor: colors.FACEBOOK,
    '&:hover': {
      backgroundColor: darken(colors.FACEBOOK, 0.2),
    },
  },
  icon: {
    flex: 1,
    maxWidth: 137,
  },
};

const FindUsOnFacebookButton = ({ classes }) => (
  <Button
    href={pesposaConfig.FACEBOOK_PAGE_URL}
    target="_blank"
    className={classes.root}
    variant="raised"
    size="large"
    fullWidth
  >
    <FindUsOnFacebookIcon className={classes.icon} />
  </Button>
);

export default withStyles(styles)(FindUsOnFacebookButton);
