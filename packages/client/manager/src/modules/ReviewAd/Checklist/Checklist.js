import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const checkList = {
  General: [
    'No duplicates.',
    'No re-posting.',
    'No ads for seeking items to buy.',
    'No personal ads (sex, relationships, massage, etc.).',
    'No illegal products.',
    'No multi level marketing jobs.',
  ],
  Images: [
    'Ad has at least one image.',
    'Images represent the actual product, not a stock/catalog photo.',
  ],
  'Title & Description': [
    'Title is not misleading. It accurately describes the item.',
    'Description is clear and concise.',
    'Title and description does not include contact information (such as phone or email).',
    'No links to third party websites.',
    'No offensive words.',
  ],
  Category: ['Ad is posted in the correct category.'],
  Location: ['The item is located in the same country as the user.'],
};

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    paddingBottom: theme.spacing.unit * 2,
  },
  checkItem: {
    paddingTop: 0,
    paddingBottom: 0,
  },
});

class Checklist extends React.Component {
  state = {
    checked: [0],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List>
          {R.map(
            ([title, items]) => (
              <React.Fragment key={title}>
                <ListItem role={undefined} button>
                  <ListItemText disableTypography>
                    <Typography variant="button">{title}</Typography>
                  </ListItemText>
                </ListItem>
                {R.addIndex(R.map)(
                  (item, index) => (
                    <ListItem
                      key={index}
                      role={undefined}
                      button
                      className={classes.checkItem}
                    >
                      <Checkbox tabIndex={-1} disableRipple />
                      <ListItemText primary={item} />
                    </ListItem>
                  ),
                  items,
                )}
              </React.Fragment>
            ),
            R.toPairs(checkList),
          )}
        </List>
      </div>
    );
  }
}

Checklist.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Checklist);
