/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { withProps, withState } from 'recompose';
import GridList, { GridListTile } from 'material-ui/GridList';
import { FormHelperText } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import * as imagesConfig from '@pesposa/core/src/config/images';
import { actions as storageActions } from 'store/firebase/storage';
import { constants as postAdConstants } from 'store/postAd';
import Imgix from 'components/Imgix/Imgix';
import Dropzone from '../Dropzone/Dropzone';

type Props = {
  images: Array<Object>,
  adImagesDbPath: string,
  uploadImages: Function,
  canUploadImage: Boolean,
  isLoading: Boolean,
  setIsLoading: Function,
  error: ?string,
  classes: Object,
};

const styles = theme => ({
  errorBox: {
    borderColor: theme.palette.error.main,
  },
  errorText: {
    color: theme.palette.error.main,
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

  render() {
    const { images, isLoading, canUploadImage, error, classes } = this.props;

    const list = R.map(
      image => (
        <GridListTile key={image.fullPath}>
          <Imgix
            image={image}
            params={{ h: 87, w: 87, fit: 'fill', bg: '000' }}
          />
        </GridListTile>
      ),
      images,
    );
    const finalList = canUploadImage
      ? R.append(
          <GridListTile key="add">
            <Dropzone
              acceptedFileTypes={imagesConfig.ACCEPTED_TYPES}
              className={error && classes.errorBox}
              onDrop={this.handleDrop}
              isLoading={isLoading}
              multiple
            />
          </GridListTile>,
          list,
        )
      : list;

    return (
      <div>
        <GridList cellHeight={87} cols={postAdConstants.MAXIMUM_IMAGES_PER_AD}>
          {finalList}
        </GridList>
        {error && (
          <FormHelperText className={classes.errorText}>{error}</FormHelperText>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  uploadImages: storageActions.uploadImages,
};

export default R.compose(
  withProps(({ images }) => ({
    canUploadImage: R.length(images) < postAdConstants.MAXIMUM_IMAGES_PER_AD,
  })),
  withState('isLoading', 'setIsLoading', false),
  connect(null, mapDispatchToProps),
  withStyles(styles),
)(EditAdImages);
