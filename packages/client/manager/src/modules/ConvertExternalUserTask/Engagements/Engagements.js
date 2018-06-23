import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { createSelector, createStructuredSelector } from 'reselect';
import TimeAgo from 'react-timeago';
import { withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import deepOrange from '@material-ui/core/colors/deepOrange';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import propSelector from '@pesposa/core/src/utils/propSelector';
import Truncate from '@pesposa/client-core/src/components/Truncate/Truncate';

const styles = {
  root: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
  },
  table: {
    tableLayout: 'fixed',
    '& tr th:first-child, & tr td:first-child': {
      width: 180,
    },
    '& tr th:nth-child(2), & tr td:nth-child(2)': {
      width: 180,
    },
  },
  readMore: {
    fontSize: 'inherit',
  },
  email: {
    color: deepOrange[600],
  },
  manualMessage: {
    color: blue[600],
  },
};

const Engagements = props => {
  const { engagements, classes } = props;

  return (
    <Paper className={classes.root} elevation={0}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Sent</TableCell>
            <TableCell>Channel</TableCell>
            <TableCell>Content</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {R.map(
            ([id, engagement]) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  <TimeAgo date={engagement.createdAt} />
                </TableCell>
                <TableCell className={classes[engagement.channel]}>
                  {engagement.channel}
                </TableCell>
                <TableCell>
                  <Truncate
                    lines={1}
                    showMoreText="Read more"
                    ellipsis="..."
                    classes={{ readMore: classes.readMore }}
                  >
                    {engagement.content}
                  </Truncate>
                </TableCell>
              </TableRow>
            ),
            engagements,
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

Engagements.propTypes = {
  engagements: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  classes: PropTypes.shape({}).isRequired,
};

const engagementsSelector = createSelector(
  propSelector('engagements'),
  R.compose(R.reverse, R.toPairs, R.defaultTo({})),
);

export default R.compose(
  withStyles(styles),
  withProps(
    createStructuredSelector({
      engagements: engagementsSelector,
    }),
  ),
)(Engagements);
