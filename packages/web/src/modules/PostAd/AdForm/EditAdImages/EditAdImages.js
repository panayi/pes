/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { withProps, withState } from 'recompose';
import { FormHelperText } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import withStyles from 'material-ui/styles/withStyles';
import DeleteIcon from 'material-ui-icons/Delete';
import { connect } from 'react-redux';
import * as imagesConfig from '@pesposa/core/src/config/images';
import { actions as storageActions } from 'store/firebase/storage';
import { constants as postAdConstants } from 'store/postAd';
import Imgix from 'components/Imgix/Imgix';
import Spinner from 'components/Spinner/Spinner';
import Dropzone from './Dropzone/Dropzone';

const ITEM_SIZE = 83;

type Props = {
  images: Object,
  imagesCount: number,
  adImagesDbPath: string,
  published: boolean,
  uploadImages: Function,
  deleteImage: Function,
  canUploadImage: Boolean,
  isLoading: boolean,
  setIsLoading: Function,
  isDeleting: string,
  setIsDeleting: Function,
  error: ?string,
  classes: Object,
};

const styles = theme => ({
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  listInner: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'auto',
    padding: 0,
    transform: 'translateZ(0)',
  },
  item: {
    flex: `0 0 ${ITEM_SIZE}px`,
    height: ITEM_SIZE,
    width: ITEM_SIZE,
    overflow: 'hidden',
    position: 'relative',
    '& + $item': {
      marginLeft: theme.spacing.unit * 2,
    },
  },
  errorBox: {
    borderColor: theme.palette.error.main,
  },
  errorText: {
    color: theme.palette.error.main,
  },
  deleteButtonWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    color: theme.palette.common.white,
    background: theme.palette.action.disabled,
    '& svg': {
      width: '1.2em',
      height: '1.2em',
    },
  },
  disabled: {
    opacity: 0.6,
  },
  spinner: {
    margin: 0,
  },
});

export class EditAdImages extends Component<Props> {
  static defaultProps = {
    files: [],
  };

  handleDrop = (files: FileList) => {
    const { adImagesDbPath, uploadImages, setIsLoading } = this.props;
    setIsLoading(true);
    uploadImages(files, adImagesDbPath).then(() => setIsLoading(false));
  };

  handleDeleteImage = async (imageId, image) => {
    const { setIsDeleting, deleteImage, adImagesDbPath } = this.props;
    setIsDeleting(imageId);
    await deleteImage(image, `${adImagesDbPath}/${imageId}`);
    setIsDeleting(null);
  };

  renderActionForImage = (imageId, image) => {
    const { isDeleting, imagesCount, published, classes } = this.props;

    if (isDeleting === imageId) {
      return <Spinner className={classes.spinner} centered />;
    }

    if (isDeleting) {
      return null;
    }

    const canDelete = !published || imagesCount > 1;

    return (
      <div className={classes.deleteButtonWrap}>
        <IconButton
          className={classNames(classes.deleteButton, {
            [classes.disabled]: !canDelete,
          })}
          disabled={!canDelete}
          size="small"
          onClick={() => this.handleDeleteImage(imageId, image)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    );
  };

  render() {
    const { images, isLoading, canUploadImage, error, classes } = this.props;
    const list = R.compose(
      R.map(([imageId, image]) => (
        <div className={classes.item} key={image.fullPath}>
          <Imgix
            image={image}
            params={{ h: ITEM_SIZE, w: ITEM_SIZE, fit: 'fill', bg: '000' }}
          />
          {this.renderActionForImage(imageId, image)}
        </div>
      )),
      R.reverse,
      R.toPairs,
    )(images);
    const finalList = canUploadImage
      ? R.prepend(
          <div className={classes.item} key="add">
            <Dropzone
              acceptedFileTypes={imagesConfig.ACCEPTED_TYPES}
              className={error && classes.errorBox}
              onDrop={this.handleDrop}
              isLoading={isLoading}
              multiple
            />
          </div>,
          list,
        )
      : list;

    return (
      <div>
        <div className={classes.list}>
          <div className={classes.listInner}>{finalList}</div>
        </div>
        {error && (
          <FormHelperText className={classes.errorText}>{error}</FormHelperText>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  uploadImages: storageActions.uploadImages,
  deleteImage: storageActions.deleteImage,
};

export default R.compose(
  withProps(({ images }) => {
    const imagesCount = R.compose(R.length, R.values)(images);

    return {
      imagesCount,
      canUploadImage: imagesCount < postAdConstants.MAXIMUM_IMAGES_PER_AD,
    };
  }),
  withState('isLoading', 'setIsLoading', false),
  withState('isDeleting', 'setIsDeleting', null),
  connect(null, mapDispatchToProps),
  withStyles(styles),
)(EditAdImages);
