/* @flow */
import React, { Component } from 'react';
import R from 'ramda';
import { Flex, Column, Image } from 'rebass';
import { defaultProps, withProps } from 'recompose';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import * as filetypes from './constants/filetypes';
import { actions } from './uploadFile';

type Props = {
  filesPath: string,
  acceptedTypes: string,
  onUpload: Function,
  uploadFile: Function,
  files: Array<Object>,
  firebase: Object,
};

export class UploadFile extends Component<Props> {
  static defaultProps = {
    files: [],
  };

  renderContent() { // eslint-disable-line
    return (
      <div>
        Drop files here or click to browse
      </div>
    );
  }

  handleDropAccepted = (files: FileList) => {
    const { filesPath, uploadFile, onUpload } = this.props;

    const promises = R.map(file => (
      uploadFile(file, filesPath)
    ), files);

    Promise
      .all(promises)
      .then(R.compose(
        onUpload,
        R.pluck('File'),
      ));
  }

  handleDropRejected() { // eslint-disable-line
    alert('Upload Rejected'); // eslint-disable-line
  }

  render() {
    const { acceptedTypes, files } = this.props;

    return (
      <div>
        <Dropzone
          accept={acceptedTypes}
          onDropAccepted={this.handleDropAccepted}
          onDropRejected={this.handleDropRejected}
          multiple
        >
          {this.renderContent()}
        </Dropzone>
        <Flex width={500} wrap>
          {R.map(file => (
            <Column w={200} key={file.fullPath}>
              <Image src={file.downloadURL} />
            </Column>
          ), files)}
        </Flex>
      </div>
    );
  }
}

const connectUploadFile = ({ acceptedTypes, uploadFile }) => R.compose(
  defaultProps({
    acceptedTypes,
  }),
  withProps(R.over(
    R.lensProp('acceptedTypes'),
    R.join(','),
  )),
  connect(null, { uploadFile }),
);

const ConnectedUploadFile = connectUploadFile({
  acceptedTypes: [],
  uploadFile: actions.uploadFile,
})(UploadFile);

ConnectedUploadFile.Image = connectUploadFile({
  acceptedTypes: filetypes.IMAGE,
  uploadFile: actions.uploadImage,
})(UploadFile);

export default ConnectedUploadFile;
