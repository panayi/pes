import React from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import propSelector from '@pesposa/core/src/utils/propSelector';
import propOrSelector from '@pesposa/core/src/utils/propOrSelector';
import { connectData } from '@pesposa/client-core/src/lib/connectData';
import { models } from '@pesposa/client-core/src/store/firebase/data';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    marginRight: theme.spacing.unit,
  },
});

const FoundOnSource = ({ image, name, classes }) => (
  <div className={classes.root}>
    {image && <Avatar className={classes.avatar} src={image.downloadURL} />}
    {name && <Typography color="textSecondary">Found on {name}</Typography>}
  </div>
);

const mapDataToProps = {
  sourceObj: models.sources.one(propSelector('source')),
};

export default R.compose(
  connectData(mapDataToProps),
  withProps(
    createStructuredSelector({
      image: R.compose(
        R.head,
        R.values,
        propOrSelector({}, ['sourceObj', 'images']),
      ),
      name: propSelector(['sourceObj', 'name']),
    }),
  ),
  withStyles(styles),
)(FoundOnSource);
