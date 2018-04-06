import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    borderBottom: [1, 'solid', theme.palette.divider],

    '&:before': {
      display: 'none',
    },
  },
  question: {
    margin: [theme.spacing.unit * 2, 0, theme.spacing.unit * 3, 0],
  },
  heading: {
    color: 'rgb(0, 132, 137)',
    fontSize: theme.typography.pxToRem(23),
    fontWeight: 600,
  },
  expandIcon: {
    top: 33,
    left: -18,
    color: 'rgb(0, 132, 137)',
  },
  answer: {
    fontSize: theme.typography.pxToRem(19),
  },
});

const Question = props => {
  const { question, answer, classes } = props;
  return (
    <ExpansionPanel className={classes.root} elevation={0}>
      <ExpansionPanelSummary
        variant="raised"
        classes={{ content: classes.question, expandIcon: classes.expandIcon }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography className={classes.heading}>{question}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography className={classes.answer}>{answer}</Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

Question.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Question);
