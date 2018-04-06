import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { withProps, withStateHandlers } from 'recompose';
import { createStructuredSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { red, green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import propSelector from '@pesposa/core/src/utils/propSelector';

const styles = {
  root: {
    width: 420,
  },
  tile: {
    cursor: 'pointer',
  },
  new: {
    border: [5, 'solid', green[200]],
  },
  deleted: {
    textAlign: 'center',
    border: [5, 'solid', red[200]],
  },
};

const AdImages = ({
  images,
  imagesCount,
  isOpen,
  currentIndex,
  open,
  close,
  next,
  prev,
  classes,
}) => (
  <React.Fragment>
    <GridList className={classes.root} cellHeight={80} cols={5}>
      {R.addIndex(R.map)(
        (image, index) => (
          <GridListTile
            className={classNames(classes.tile, {
              [classes.new]: image.new,
              [classes.deleted]: image.deleted,
            })}
            onClick={() => (image.deleted ? null : open(index))}
            key={image.fullPath || image.id}
          >
            {image.deleted ? (
              <Tooltip title={`Image id=${image.id}`}>
                <Typography variant="button">Deleted Image</Typography>
              </Tooltip>
            ) : (
              <img src={image.downloadURL} alt={image.fullPath} />
            )}
          </GridListTile>
        ),
        images,
      )}
    </GridList>
    {isOpen && (
      <Lightbox
        mainSrc={images[currentIndex].downloadURL}
        nextSrc={images[(currentIndex + 1) % imagesCount].downloadURL}
        prevSrc={
          images[(currentIndex + imagesCount - 1) % imagesCount].downloadURL
        }
        onCloseRequest={close}
        onMovePrevRequest={() => prev(imagesCount)}
        onMoveNextRequest={() => next(imagesCount)}
        reactModalStyle={{ overlay: { zIndex: 1301 } }}
      />
    )}
  </React.Fragment>
);

AdImages.defaultProps = {
  images: [],
};

const initialState = {
  isOpen: false,
  currentIndex: 0,
};

const imagesSelector = createCachedSelector(
  propSelector('images'),
  propSelector('beforeImages'),
  (images, beforeImages) => {
    if (R.isNil(beforeImages)) {
      return R.compose(
        R.map(([id, image]) => R.merge(image, { id })),
        R.toPairs,
      )(images);
    }

    const beforeIds = R.keys(beforeImages);
    const afterIds = R.keys(images);
    const removedIds = R.without(afterIds, beforeIds);
    const removedImages = R.map(id => ({ id, deleted: true }), removedIds);

    return R.compose(
      R.concat(R.__, removedImages),
      R.map(
        ([id, image]) =>
          R.contains(id, beforeIds)
            ? { ...image, id }
            : { ...image, id, new: true },
      ),
      R.toPairs,
    )(images);
  },
)(propSelector('adId'));

const imagesCountSelector = R.compose(
  R.length,
  R.values,
  propSelector('images'),
);

export default R.compose(
  withProps(
    createStructuredSelector({
      images: imagesSelector,
      imagesCount: imagesCountSelector,
    }),
  ),
  withStateHandlers(initialState, {
    open: () => currentIndex => ({
      isOpen: true,
      currentIndex,
    }),
    close: () => () => initialState,
    prev: ({ currentIndex }) => imagesCount => ({
      currentIndex: (currentIndex + imagesCount - 1) % imagesCount,
    }),
    next: ({ currentIndex }) => imagesCount => ({
      currentIndex: (currentIndex + 1) % imagesCount,
    }),
  }),
  withStyles(styles),
)(AdImages);
