import React from 'react';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
import ScheduleIcon from '@material-ui/icons/Schedule';
import AdDate from '@pesposa/client-core/src/modules/Ad/AdDate/AdDate';

const styles = {
  root: {
    height: 20,
  },
  icon: {
    width: 20,
    height: 20,
  },
};

const AdDateChip = ({ classes, ad }) => (
  <AdDate ad={ad}>
    {({ date }) =>
      date ? (
        <Chip
          classes={{ root: classes.root }}
          avatar={
            <Avatar className={classes.icon}>
              <ScheduleIcon />
            </Avatar>
          }
          label={date}
        />
      ) : null
    }
  </AdDate>
);

export default withStyles(styles)(AdDateChip);
