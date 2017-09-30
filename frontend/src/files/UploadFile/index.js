/* @flow */
import React, { Component } from 'react';
import R from 'ramda';
import { Flex, Column, Image } from 'rebass';
import { defaultProps, withProps } from 'recompose';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import Dropzone from 'react-dropzone';
import * as filetypes from '../constants/filetypes';
import { actions } from './uploadFile';

type Props = {
  filesPath: string,
  acceptedTypes: string,
  uploadFile: Function,
  uploadedFiles: Object,
  firebase: Object,
};

export class UploadFile extends Component<Props> {
  renderContent() { // eslint-disable-line
    return (
      <div>
        Drop files here or click to browse
      </div>
    );
  }

  handleDropAccepted = (files: FileList) => {
    const { filesPath, uploadFile } = this.props;

    R.forEach(file => (
      uploadFile(file, filesPath)
    ), files);
  }

  handleDropRejected() { // eslint-disable-line
    alert('Upload Rejected'); // eslint-disable-line
  }

  render() {
    const { acceptedTypes, uploadedFiles } = this.props;

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
          {R.map(([id, file]) => (
            <Column w={200} key={id}>
              <Image src={file.downloadURL} />
            </Column>
          ), R.toPairs(uploadedFiles))}
        </Flex>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  uploadedFiles: R.pathOr(
    {},
    ['firebase', 'data', ...R.split('/', props.filesPath)],
    state,
  ),
});

const mapDispatchToProps = {
  uploadFile: actions.uploadFile,
};

const ConnectedUploadFile = R.compose(
  defaultProps({
    acceptedTypes: [],
  }),
  withProps(R.over(
    R.lensProp('acceptedTypes'),
    R.when(R.is(Array), R.join(',')),
  )),
  firebaseConnect(props => ([
    props.filesPath,
  ])),
  connect(mapStateToProps, mapDispatchToProps),
)(UploadFile);


ConnectedUploadFile.Image = R.compose(
  defaultProps({
    acceptedTypes: filetypes.IMAGE,
  }),
  connect(null, {
    uploadFile: actions.uploadImage,
  }),
)(ConnectedUploadFile);

export default ConnectedUploadFile;
