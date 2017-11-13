/* @flow weak */
import React, { Component } from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import classNames from 'classnames';
import { Grid, Button, Typography, withStyles } from 'material-ui';
import ReactDropzone from 'react-dropzone';
import Spinner from 'react-spinkit';
import * as utils from './utils';
import * as fileTypes from './constants/fileTypes';
import icons from './constants/icons';

type Props = {
  acceptedFileTypes: Array<string>,
  onDrop: Function,
  isLoading: Boolean,
  accept: string,
  prettyPrintFileTypes: string,
  classes: Object,
  Icon: React$Component<*>,
};

const dropzonePropKeys = R.keys(ReactDropzone.propTypes);

const HEIGHT = 250;
const ICON_SIZE = 100;

const styles = theme => ({
  root: {
    position: 'relative',
    minHeight: `${HEIGHT}px`,
    paddingTop: `${HEIGHT / 2}px`,
    border: `4px dashed ${theme.palette.grey['200']}`,
    textAlign: 'center',
    transition: 'border-color 0.1s',
  },
  icon: {
    position: 'absolute',
    left: `calc(50% - ${ICON_SIZE / 2}px)`,
    top: `calc(50% - ${(3 / 4) * ICON_SIZE}px)`,
    width: `${ICON_SIZE}px`,
    height: `${ICON_SIZE}px`,
    color: theme.palette.grey['200'],
  },
  content: {
    paddingTop: `${(1 / 4) * ICON_SIZE}px`,
  },
  accepted: {
    borderColor: theme.palette.grey['500'],
  },
  rejected: {
    borderColor: theme.palette.error['200'],
    color: theme.palette.error['300'],
    cursor: 'no-drop',
  },
});

export class Dropzone extends Component<Props> {
  static defaultProps = {
    multiple: true,
    icon: null,
  };

  renderMessage(dropzoneProps) {
    const { isDragReject, isDragAccept } = dropzoneProps;
    const { prettyPrintFileTypes, isLoading } = this.props;

    if (isLoading) {
      return (
        <Spinner name="circle" />
      );
    }

    if (isDragReject) {
      return [
        <Typography key={0}>
          The files must be in one of the following formats:
        </Typography>,
        <Typography key={1}>
          {prettyPrintFileTypes}
        </Typography>,
      ];
    }

    if (isDragAccept) {
      return (
        <Typography>
          Drop to upload files
        </Typography>
      );
    }

    return (
      <Typography>
        Drag and drop files here or
        <br />
        <Button color="primary">
          Browse files
        </Button>
      </Typography>
    );
  }

  render() {
    const { onDrop, classes, Icon, ...otherProps } = this.props;

    return (
      <ReactDropzone
        onDropAccepted={onDrop}
        {...R.pick(dropzonePropKeys, otherProps)}
        style={{}} // strips all default Dropzone styles
      >
        {dropzoneProps => (
          <Grid
            className={classNames(classes.root, {
              [classes.accepted]: dropzoneProps.isDragAccept,
              [classes.rejected]: dropzoneProps.isDragReject,
            })}
            container
            alignItems="center"
            direction="column"
            spacing={0}
          >
            <Icon className={classes.icon} />
            <Grid className={classes.content}>
              {this.renderMessage(dropzoneProps)}
            </Grid>
          </Grid>
        )}
      </ReactDropzone>
    );
  }
}

export default R.compose(
  withProps(({ acceptedFileTypes }) => ({
    accept: utils.getAccept(acceptedFileTypes),
    prettyPrintFileTypes: utils.getPrettyPrintFileTypes(acceptedFileTypes),
    Icon: icons[acceptedFileTypes],
  })),
  withStyles(styles),
)(Dropzone);

export {
  fileTypes,
};
