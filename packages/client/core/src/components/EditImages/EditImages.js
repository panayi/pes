import React, { Component } from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { withProps, withStateHandlers, renameProp } from 'recompose';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import * as imagesConfig from '@pesposa/core/src/config/images';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import generateId from '@pesposa/core/src/utils/generateId';
import { actions as storageActions } from '../../store/firebase/storage';
import Spinner from '../Spinner/Spinner';
import Dropzone from './Dropzone/Dropzone';

const ITEM_SIZE = 83;

// type Props = {
//   dbPath: string,
//   canDelete: Function,
//   uploadImage: Function,
//   deleteImage: Function,
//   error: ?string,
//   classes: Object,
// };

const styles = theme => ({
  list: {
    display: 'flex',
    flexWrap: 'wrap',
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
  image: {
    height: ITEM_SIZE,
    width: ITEM_SIZE,
    objectFit: 'cover',
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
    height: 40,
    width: 40,
    color: theme.palette.common.white,
    background: theme.palette.action.disabled,
    '& svg': {
      width: 24,
      height: 24,
    },
  },
  disabled: {
    opacity: 0.6,
  },
  spinner: {
    margin: 0,
  },
});

export class EditImages extends Component {
  static defaultProps = {
    images: {},
    canDelete: R.T,
  };

  componentDidUpdate(prevProps) {
    if (propsChanged(['imagesFromProps'], this.props, prevProps)) {
      const { imagesFromProps, receiveImagesFromProps } = this.props;
      receiveImagesFromProps(imagesFromProps);
    }
  }

  addLocalImage = file => {
    const id = generateId();
    this.props.addLocalImage(id, file);
    return id;
  };

  previewImage = (id, file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      this.props.setPreviewUrl(id, reader.result);
    };

    reader.readAsDataURL(file);
  };

  uploadImage = async (id, file, dbPath) => {
    const {
      uploadImage,
      willUploadLocalImage,
      didUploadLocalImage,
    } = this.props;
    const finalDbPath = dbPath || this.props.dbPath;

    if (!finalDbPath) {
      return;
    }

    willUploadLocalImage(id);
    const name = id;
    const result = await uploadImage(file, finalDbPath, name);
    didUploadLocalImage(id, result);
  };

  uploadLocalImages = dbPath =>
    Promise.all(
      R.map(
        ({ id, image }) => this.uploadImage(id, image, dbPath),
        this.props.localImages,
      ),
    );

  handleDrop = files => {
    R.forEach(file => {
      const id = this.addLocalImage(file);
      this.uploadImage(id, file);
      this.previewImage(id, file);
    }, files);
  };

  handleDeleteImage = async (id, fullPath) => {
    const { deleteImage, dbPath, willDeleteImage, didDeleteImage } = this.props;
    willDeleteImage(id);
    await deleteImage(fullPath, `${dbPath}/${id}`);
    didDeleteImage(id);
  };

  renderActionForLocalImage = ({ id, isLoading }) => {
    const { removeLocalImage, classes } = this.props;

    if (isLoading) {
      return <Spinner className={classes.spinner} centered />;
    }

    return (
      <div className={classes.deleteButtonWrap}>
        <IconButton
          className={classNames(classes.deleteButton)}
          size="small"
          onClick={() => removeLocalImage(id)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    );
  };

  renderActionForUploadedImage = ({ id, fullPath, isDeleting }) => {
    const { canDelete, uploadedImages, classes } = this.props;
    const imagesCount = R.length(uploadedImages);

    if (isDeleting) {
      return <Spinner className={classes.spinner} centered />;
    }

    const allowDelete = canDelete(imagesCount);

    return (
      <div className={classes.deleteButtonWrap}>
        <IconButton
          className={classNames(classes.deleteButton, {
            [classes.disabled]: !allowDelete,
          })}
          disabled={!allowDelete}
          size="small"
          onClick={() => this.handleDeleteImage(id, fullPath)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    );
  };

  render() {
    const {
      localImages,
      uploadedImages,
      maxImages,
      children,
      error,
      classes,
    } = this.props;
    const localImagesList = R.addIndex(R.map)(
      (image, index) => (
        <div key={index} className={classes.item}>
          <img className={classes.image} src={image.url} alt="" />
          {this.renderActionForLocalImage(image)}
        </div>
      ),
      localImages,
    );
    const uploadedImagesList = R.compose(
      R.map(image => (
        <div key={image.fullPath} className={classes.item}>
          <img className={classes.image} src={image.downloadURL} alt="" />
          {this.renderActionForUploadedImage(image)}
        </div>
      )),
    )(uploadedImages);
    const allImagesList = R.concat(localImagesList, uploadedImagesList);
    const canUploadImage = allImagesList.length < maxImages;
    const finalList = canUploadImage
      ? R.prepend(
          <div className={classes.item} key="add">
            <Dropzone
              acceptedFileTypes={imagesConfig.ACCEPTED_TYPES}
              inputProps={{
                capture: 'camera',
              }}
              className={error && classes.errorBox}
              onDrop={this.handleDrop}
              multiple
            />
          </div>,
          allImagesList,
        )
      : allImagesList;

    return (
      <div>
        <div className={classes.list}>
          <div className={classes.listInner}>{finalList}</div>
        </div>
        {error && (
          <FormHelperText className={classes.errorText}>{error}</FormHelperText>
        )}
        {children
          ? children({
              uploadImages: this.uploadLocalImages,
            })
          : null}
      </div>
    );
  }
}

const mapDispatchToProps = {
  uploadImage: storageActions.uploadImage,
  deleteImage: storageActions.deleteImage,
};

const updateLocalImage = (updater, id, images) =>
  R.map(R.when(R.propEq('id', id), updater), images);

const serializeImagesFromProps = R.compose(
  R.reverse,
  R.map(([key, image]) => R.merge(image, { id: key })),
  R.toPairs,
  R.defaultTo({}),
);

export default R.compose(
  renameProp('images', 'imagesFromProps'),
  withStateHandlers(
    ({ imagesFromProps }) => ({
      images: serializeImagesFromProps(imagesFromProps),
    }),
    {
      receiveImagesFromProps: ({ images }) => imagesFromProps => {
        const newImages = R.compose(
          R.reject(image =>
            R.find(existingImage => existingImage.id === image.name, images),
          ),
          serializeImagesFromProps,
        )(imagesFromProps);
        const existingImages = R.filter(R.propEq('local', true), images);
        return {
          images: R.concat(existingImages, newImages),
        };
      },
      addLocalImage: ({ images }) => (id, image) => ({
        images: R.prepend({ id, image, local: true }, images),
      }),
      setPreviewUrl: ({ images }) => (id, url) => ({
        images: updateLocalImage(R.assoc('url', url), id, images),
      }),
      removeLocalImage: ({ images }) => id => ({
        images: R.reject(R.propEq('id', id), images),
      }),
      willUploadLocalImage: ({ images }) => id => ({
        images: updateLocalImage(R.assoc('isLoading', true), id, images),
      }),
      didUploadLocalImage: ({ images }) => (id, { File: file, key }) => ({
        images: updateLocalImage(
          R.compose(
            R.merge(R.__, {
              id: key,
              downloadURL: file.downloadURL,
              fullPath: file.fullPath,
            }),
            R.dissoc('local'),
          ),
          id,
          images,
        ),
      }),
      willDeleteImage: ({ images }) => id => ({
        images: updateLocalImage(R.assoc('isDeleting', true), id, images),
      }),
      didDeleteImage: ({ images }) => id => ({
        images: R.reject(R.propEq('id', id), images),
      }),
    },
  ),
  withProps(({ images }) => ({
    localImages: R.filter(R.propEq('local', true), images),
    uploadedImages: R.reject(R.propEq('local', true), images),
  })),
  connect(null, mapDispatchToProps),
  withStyles(styles),
)(EditImages);
