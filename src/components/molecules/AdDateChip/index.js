import React from 'react';
import { Chip, withStyles } from 'material-ui';
import ScheduleIcon from 'material-ui-icons/Schedule';
import AdDate from 'components/atoms/AdDate';

const styles = {
  root: {
    height: 20,
  },
  icon: {
    width: 20,
    height: 20,
  },
};

const AdDateChip = ({ classes, ...rest }) => (
  <Chip
    classes={{ root: classes.root }}
    avatar={<ScheduleIcon className={classes.icon} />}
    label={<AdDate {...rest} />}
  />
);

export default withStyles(styles)(AdDateChip);
