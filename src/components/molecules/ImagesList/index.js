// @flow weak
import React from 'react';
import * as R from 'ramda';
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile } from 'material-ui/GridList';

type Props = {
  images: Array<Object>,
  cellHeight: Number,
  classes: Object,
};

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    background: theme.palette.background.paper,
  },
  gridList: {
    // width: 500,
    // height: 450,
  },
  subheader: {
    width: '100%',
  },
});

const ImagesList = ({ images, classes, ...gridListProps }: Props) => (
  <div className={classes.root}>
    <GridList
      className={classes.gridList}
      {...gridListProps}
    >
      {R.map(({ src, title }) => (
        <GridListTile key={src}>
          <img
            src={src}
            alt={title}
          />
        </GridListTile>
      ), images)}
    </GridList>
  </div>
);

ImagesList.defaultProps = {
  cellHeight: 160,
  cols: 3,
};

export default withStyles(styles)(ImagesList);
