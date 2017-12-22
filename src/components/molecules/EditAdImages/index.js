/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { withProps, withState } from 'recompose';
import { GridList, GridListTile } from 'material-ui/GridList';
import { connect } from 'react-redux';
import Dropzone, { fileTypes } from 'components/molecules/Dropzone';
import { actions } from 'store/storage';
import { constants } from 'store/ads';

type Props = {
  images: Array<Object>,
  adImagesDbPath: string,
  uploadImages: Function,
  canUploadImage: Boolean,
  isLoading: Boolean,
  setIsLoading: Function,
};

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
    const { images, isLoading, canUploadImage } = this.props;

    return (
      <GridList cellHeight={87} cols={constants.MAXIMUM_IMAGES_PER_AD}>
        {R.map(
          image => (
            <GridListTile key={image.fullPath}>
              <img src={image.downloadURL} alt={image.fullPath} />
            </GridListTile>
          ),
          images,
        )}
        {canUploadImage && (
          <GridListTile
            component={Dropzone}
            acceptedFileTypes={fileTypes.IMAGE}
            onDrop={this.handleDrop}
            isLoading={isLoading}
            multiple
          />
        )}
      </GridList>
    );
  }
}

const mapDispatchToProps = {
  uploadImages: actions.uploadImages,
};

export default R.compose(
  withProps(({ images }) => ({
    canUploadImage: R.length(images) < constants.MAXIMUM_IMAGES_PER_AD,
  })),
  withState('isLoading', 'setIsLoading', false),
  connect(null, mapDispatchToProps),
)(EditAdImages);
